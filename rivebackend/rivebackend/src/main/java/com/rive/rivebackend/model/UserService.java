package com.rive.rivebackend.model;

import com.rive.rivebackend.Dto.jwtToken.RefreshTokenRequest;
import com.rive.rivebackend.Dto.jwtToken.RefreshTokenResponse;
import com.rive.rivebackend.Dto.user.UserLogInRequest;
import com.rive.rivebackend.Dto.user.UserLogInResponse;
import com.rive.rivebackend.Dto.user.UserSignUpRequest;
import com.rive.rivebackend.Dto.user.UserSignUpResponse;
import com.rive.rivebackend.entity.UserEntity;
import com.rive.rivebackend.errors.UserAlreadyExistsException;
import com.rive.rivebackend.errors.UserValidate;
import com.rive.rivebackend.repository.UserRepository;
import com.rive.rivebackend.service.AuthService;
import com.rive.rivebackend.service.JwtService;
import com.rive.rivebackend.service.UserServices;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class UserService implements UserModal{


    private final AuthService authService;

    private final UserRepository userRepository;

    private final AuthenticationManager authManager;

    private final JwtService jwtService;


    public UserService(AuthService authService, UserRepository userRepository, AuthenticationManager authManager, JwtService jwtService) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.authManager = authManager;
        this.jwtService = jwtService;
    }

    @Override
    public UserSignUpResponse saveNewUser(UserSignUpRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
                throw new UserAlreadyExistsException("User With Email " + request.getEmail() + " Already Exists");
            }
        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
                throw new UserAlreadyExistsException("User With Phone Number " + request.getPhoneNumber() + " Already Exists");
            }
        if (userRepository.existsByUsername(request.getUsername())) {
                throw new UserAlreadyExistsException("User With Username " + request.getUsername() + " Already Exists");
            }

         authService.validateUser(request);

        UserEntity user=new UserEntity();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setUserIsEnabled(true);
        user.setPassword(authService.encodePassword(request.getPassword()));
        user.setName(request.getName());
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        UserSignUpResponse response=new UserSignUpResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setCreatedAt(user.getCreatedAt());
        response.setActive(user.getUserIsEnabled());
        response.setMessage("User registered successfully Please login to proceed");

        return response;
    }

    @Override
    public UserLogInResponse loginUser(UserLogInRequest request, HttpServletResponse response) {

            Optional<UserEntity> dbUser=userRepository.findByEmail(request.getEmail());

            if (dbUser.isEmpty()){
                throw new UserValidate("Your "+request.getEmail()+" is not exists in our database please sign up");
            }

                try {
                    authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
                }catch (AuthenticationException e){
                    throw new UserValidate("Invalid email ans password");
                }


                UserEntity user = dbUser.get();

                String accessToken=jwtService.generateToken(request.getEmail(),true);

                String refreshToken=jwtService.generateToken(request.getEmail(),false);

                Cookie refreshCookie=new Cookie("refreshCookie",refreshToken);
                refreshCookie.setHttpOnly(true);
                refreshCookie.setSecure(true);
                refreshCookie.setPath("/");
                refreshCookie.setMaxAge(7*24*60*60);
                response.addCookie(refreshCookie);

                UserLogInResponse loginResponse=new UserLogInResponse();
                loginResponse.setId(user.getId());
                loginResponse.setUser(user.getName());
                loginResponse.setAccessToken(accessToken);
                loginResponse.setEmail(user.getEmail());
                loginResponse.setExpiresIn(1200);
                loginResponse.setMessage("Welcome "+user.getName());

                return loginResponse;

    }

    public List<UserEntity> getAllUser(){
        return userRepository.findAll();
    }

    @Override
    public UserEntity getUserById(long id) {
        Optional<UserEntity> user=userRepository.findById(id);
        return user.orElse(null);
    }

    public boolean findExistingEmail(String email){
      return userRepository.existsByEmail(email);
    }

    @Override
    public boolean findByUsername(String username) {
      return userRepository.existsByUsername(username);
    }

    @Override
    public boolean findByMobileNo(String mobileNo) {
        return userRepository.existsByPhoneNumber(mobileNo);
    }

    @Override
    public UserEntity updateUser(UserEntity user){
       return userRepository.save(user);
    }

    @Override
    public RefreshTokenResponse refreshToken(String token, RefreshTokenRequest request, HttpServletResponse response) {

        if ( token==null || token.isEmpty()){
            throw new UserValidate("Refresh token not found");
        }

        if (!jwtService.validateToken(token)){
            throw new UserValidate("Invalid or expired refresh token");
        }

        String email=jwtService.getUsernameFromToken(token);
        UserEntity dbUser=userRepository.findByEmail(email).get();

        String newAccessToken=jwtService.generateToken(dbUser.getEmail(),true);

        String newRefreshToken=jwtService.generateToken(dbUser.getEmail(),false);

        Cookie refreshCookie=new Cookie("refreshCookie",newRefreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(7*24*60*60);
        response.addCookie(refreshCookie);



        RefreshTokenResponse refreshToken=new RefreshTokenResponse();
        refreshToken.setUser(dbUser.getName());
        refreshToken.setAccessToken(newAccessToken);
        refreshToken.setEmail(dbUser.getEmail());
        refreshToken.setExpiresIn(1200);


        return refreshToken;
    }

    @Override
    public UserEntity findByUser(String userName){
        UserEntity user = userRepository.findByUsername(userName);

        if (user!=null){
            return user;
        }

        return null;

    }
}
