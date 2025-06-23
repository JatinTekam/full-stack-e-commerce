package com.rive.rivebackend.service;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET_KEY="kfjihdjkeukd1245dekuendhleunfdhndk";
    private static final long ACCESS_TOKEN_EXP= 20 * 60 * 1000;
    private static final long REFRESH_TOKEN_EXP= 72 * 60 * 60 * 1000;


    public String generateToken(String username,boolean isAccessToken){

        long expiration= isAccessToken ? ACCESS_TOKEN_EXP : REFRESH_TOKEN_EXP;

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+expiration))
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8)))
                .compact();

    }


    public String getUsernameFromToken(String token){
        return Jwts
                .parser()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody().getSubject();
    }


    public boolean validateToken(String token){
         try{
             Jwts.parser().setSigningKey(SECRET_KEY.getBytes()).build().parseClaimsJws(token);
         }catch (JwtException e){
             return false;
         }
         return true;
    }
}
