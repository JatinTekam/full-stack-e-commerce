package com.rive.rivebackend.service;

import com.rive.rivebackend.Dto.JwtToken.RefreshTokenRequest;
import com.rive.rivebackend.Dto.JwtToken.RefreshTokenResponse;
import com.rive.rivebackend.Dto.User.*;
import com.rive.rivebackend.entity.UserEntity;
import com.rive.rivebackend.errors.UserAlreadyExistsException;
import com.rive.rivebackend.errors.UserValidate;
import com.rive.rivebackend.model.UserModel;
import com.rive.rivebackend.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class UserService implements UserModel {


    private final AuthService authService;

    private final UserRepository userRepository;

    private final AuthenticationManager authManager;

    private final JwtService jwtService;

    @Autowired
    private UserDetail userDetail;


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
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        UserSignUpResponse response=new UserSignUpResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
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
                    throw new UserValidate("Invalid email and password");
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
                loginResponse.setUsername(user.getUsername());
                loginResponse.setAccessToken(accessToken);
                loginResponse.setEmail(user.getEmail());
                loginResponse.setExpiresIn(1200);
                loginResponse.setStatus(200);
                loginResponse.setMessage("Welcome "+user.getFirstName()+" "+user.getLastName());

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
    public UserUpdateResponse updateUserDetails(UserUpdateRequest request){

        Optional<UserEntity> dbUser = userRepository.findByEmail(request.getEmail());

        UserUpdateResponse updateUserResponse=new UserUpdateResponse();

        if(dbUser.isPresent()){
            UserEntity user = dbUser.get();
            user.setUsername(request.getUsername());
            user.setAddress(request.getAddress());
            user.setEmail(request.getEmail());
            user.setPhoneNumber(request.getPhoneNumber());
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setCity(request.getCity());
            user.setState(request.getState());
            user.setZipCode(request.getZipCode());
            user.setUpdatedAt(LocalDateTime.now());

            userRepository.save(user);
            updateUserResponse.setMessage("Data Update Successfully");
            updateUserResponse.setStatus(200);
            updateUserResponse.setError(null);
            return updateUserResponse;
        }
          throw new UserValidate("User Not Found");
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
        refreshToken.setUser(dbUser.getUsername());
        refreshToken.setAccessToken(newAccessToken);
        refreshToken.setEmail(dbUser.getEmail());
        refreshToken.setExpiresIn(1200);


        return refreshToken;
    }

    @Override
    public SetUser findByUser(String username){
        UserEntity dbUser = userRepository.findByUsername(username);
        if (dbUser==null){
            throw new UserValidate("User not found");
        }
        SetUser user=new SetUser();
        user.setEmail(dbUser.getEmail());
        user.setFirstName(dbUser.getFirstName());
        user.setLastName(dbUser.getLastName());
        user.setAddress(dbUser.getAddress());
        user.setCity(dbUser.getCity());
        user.setState(dbUser.getState());
        user.setZipCode(dbUser.getZipCode());
        user.setUsername(dbUser.getUsername());
        user.setPhoneNumber(dbUser.getPhoneNumber());


        return user;

    }
}
