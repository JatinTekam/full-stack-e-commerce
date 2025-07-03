package com.rive.rivebackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, CustomAuthenticationEntryPoint customAuthenticationEntryPoint) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.customAuthenticationEntryPoint = customAuthenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.
                csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
               .authorizeHttpRequests(auth->auth
                       .requestMatchers(HttpMethod.POST, "/api/v1/signup").permitAll()
                       .requestMatchers(HttpMethod.POST, "/api/v1/login").permitAll()
                       .requestMatchers(HttpMethod.GET, "/api/v1/allUser").permitAll()
                       .requestMatchers("/user/**").permitAll()

                       .requestMatchers("/api/v1/**").authenticated()
                       .anyRequest().permitAll()

               )
                .exceptionHandling(exception->exception.authenticationEntryPoint(customAuthenticationEntryPoint))
                .sessionManagement(session-> session.sessionCreationPolicy(

                       SessionCreationPolicy.STATELESS
               ))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

             return http.build();

   }




   @Bean
   public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(12);
   }


    @Bean
    public AuthenticationManager authManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();

    }




}
