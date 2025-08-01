package com.rive.rivebackend.service;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt_secret_key}")
    private String SECRET_KEY;
    private static final long ACCESS_TOKEN_EXP= 20 * 60 * 1000;
    //private static final long REFRESH_TOKEN_EXP= 7 * 24 * 60 * 60 * 1000L;


    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }


    public String generateToken(String email,boolean isAccessToken){

       // long expiration= ACCESS_TOKEN_EXP;

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+ACCESS_TOKEN_EXP))
                .signWith(getSigningKey())
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
             Jwts.parser().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
         }catch (JwtException e){
             return false;
         }
         return true;
    }
}
