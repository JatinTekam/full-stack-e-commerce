package com.rive.rivebackend.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(cust->cust.disable());
        http.authorizeHttpRequests(req->req.anyRequest().authenticated());
        //http.formLogin(Customizer.withDefaults());
        http.httpBasic(Customizer.withDefaults());
        http.sessionManagement(session->session.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS
        ));
       return http.build();
   }


   @Bean
   public UserDetailsService userDetailsService(){
        return new InMemoryUserDetailsManager();
   }
}
//public class SecurityConfig {

//  @Bean
//  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//      httpSecurity.exceptionHandling(c->c.authenticationEntryPoint(
//              new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
//              .csrf(AbstractHttpConfigurer::disable)
//              .sessionManagement(c->c.sessionCreationPolicy(
//                      SessionCreationPolicy.STATELESS
//              ))
//              .authorizeHttpRequests(req->req.anyRequest().permitAll());
//
//      return httpSecurity.build();
//  }



//}
