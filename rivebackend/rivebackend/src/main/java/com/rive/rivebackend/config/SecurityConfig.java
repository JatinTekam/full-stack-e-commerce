package com.rive.rivebackend.config;
import com.rive.rivebackend.passwordEncode.PasswordEncoderConfig;
import com.rive.rivebackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    @Autowired
    private UserService userExists;

    @Autowired
    private PasswordEncoderConfig passwordEncoder;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.
                csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
               .authorizeHttpRequests(auth->auth

                       .requestMatchers("/api/v1/login","/api/v1/signup").permitAll().anyRequest().authenticated()
               ).sessionManagement(session-> session.sessionCreationPolicy(

                       SessionCreationPolicy.STATELESS
               ))
                .addFilterBefore(filterObject, UsernamePasswordAuthenticationFilter.class);

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



//   @Bean
//   public AuthenticationManager authManager(){
//       DaoAuthenticationProvider daoProvider=new DaoAuthenticationProvider();
//       daoProvider.setUserDetailsService(userExists);
//       daoProvider.setPasswordEncoder(passwordEncoder.passwordEncoder());
//       return new ProviderManager(daoProvider);
//   }


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
