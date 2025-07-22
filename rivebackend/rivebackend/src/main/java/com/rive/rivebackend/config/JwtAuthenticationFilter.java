package com.rive.rivebackend.config;

import com.rive.rivebackend.service.JwtService;
import com.rive.rivebackend.service.UserDetail;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    private final JwtService jwtService;

    private final UserDetail userService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetail userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authenticateHeader=request.getHeader("Authorization");
        if(authenticateHeader!=null && authenticateHeader.startsWith("Bearer")){

            String token=authenticateHeader.substring(7);

            if (jwtService.validateToken(token)){
                String usernameFromToken=jwtService.getUsernameFromToken(token);
                UserDetails userDetails=userService.loadUserByUsername(usernameFromToken);

                if(SecurityContextHolder.getContext().getAuthentication()==null){

                    UsernamePasswordAuthenticationToken authentication=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }

            }

        }
        filterChain.doFilter(request,response);
    }
}
