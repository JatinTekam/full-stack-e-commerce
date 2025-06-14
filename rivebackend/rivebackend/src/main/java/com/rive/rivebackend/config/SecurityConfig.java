package com.rive.rivebackend.config;
import com.rive.rivebackend.entity.UserEntity;
import com.rive.rivebackend.passwordEncode.PasswordEncoderConfig;
import com.rive.rivebackend.service.UserExists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    @Autowired
    private UserExists userExists;

    @Autowired
    private PasswordEncoderConfig passwordEncoder;

    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.
                cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
               .authorizeHttpRequests(auth->auth

                       .requestMatchers("/api/v1/login","/api/v1/signup").permitAll().anyRequest().authenticated()
               ).sessionManagement(session-> session.sessionCreationPolicy(

                       SessionCreationPolicy.STATELESS
               ))
                .logout(AbstractHttpConfigurer::disable);

             return http.build();

   }


   @Bean
   public AuthenticationManager authManager(){
       DaoAuthenticationProvider daoProvider=new DaoAuthenticationProvider();
       daoProvider.setUserDetailsService(userExists);
       daoProvider.setPasswordEncoder(passwordEncoder.passwordEncoder());
       return new ProviderManager(daoProvider);
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
