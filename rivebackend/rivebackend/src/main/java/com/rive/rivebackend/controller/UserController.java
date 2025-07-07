package com.rive.rivebackend.controller;
import com.rive.rivebackend.Dto.user.UserLogInRequest;
import com.rive.rivebackend.Dto.JwtResponse;
import com.rive.rivebackend.Dto.user.UserLogInResponse;
import com.rive.rivebackend.Dto.RefreshTokenRequest;
import com.rive.rivebackend.Dto.user.UserSignUpRequest;
import com.rive.rivebackend.Dto.user.UserSignUpResponse;
import com.rive.rivebackend.entity.UserEntity;
import com.rive.rivebackend.errors.UserAlreadyExistsException;
import com.rive.rivebackend.errors.UserValidate;
import com.rive.rivebackend.model.UserModal;
import com.rive.rivebackend.repository.UserRepository;
import com.rive.rivebackend.service.AuthService;
import com.rive.rivebackend.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserModal userModal;

    private final AuthenticationManager authManager;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final AuthService service;

    public UserController(UserModal userModal, AuthenticationManager authManager, JwtService jwtService, UserRepository userRepository,AuthService service) {
        this.userModal = userModal;
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.service=service;
    }


    @PostMapping("/signup")
    public ResponseEntity<?> userSignUp(@RequestBody UserSignUpRequest user) {
        Map<String,Object> errMsg=new HashMap<>();
        try{
            UserSignUpResponse userSignUpResponse = userModal.saveNewUser(user);
           return ResponseEntity.status(HttpStatus.CREATED).body(userSignUpResponse);
        }catch (UserAlreadyExistsException | UserValidate e){
            errMsg.put("message",e.getMessage());
            errMsg.put("status",409);
           return ResponseEntity.status(HttpStatus.CONFLICT).body(errMsg);
        }
    }



    @GetMapping("/allUser")
    public List<UserEntity> getAllUser(){
       return userModal.getAllUser();
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLogInRequest user, HttpServletResponse response) {
        try{

            UserLogInResponse userLogInResponse = userModal.loginUser(user, response);
            return ResponseEntity.status(HttpStatus.OK).body(userLogInResponse);

        }catch (BadCredentialsException e){
            throw new BadCredentialsException("Invalid email or password");
        }

    }



    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@CookieValue(name = "refreshCookie",required = false) String refreshCookie,RefreshTokenRequest request,HttpServletResponse response) {

        try {
            //System.out.println(refreshCookie);
            UserLogInResponse userLogInResponse = userModal.refreshToken(refreshCookie, request, response);
            return ResponseEntity.status(HttpStatus.OK).body(userLogInResponse);
        }catch (UserValidate e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }


//        if(jwtService.validateToken(user.refreshToken())){
//         String usernameFromToken=jwtService.getUsernameFromToken(user.refreshToken());
//
//         String accessToken=jwtService.generateToken(usernameFromToken,true);
//         String refreshToken=jwtService.generateToken(usernameFromToken,false);
//
//            UserEntity dbUser=userRepository.findByEmail(usernameFromToken).get();
//
//            JwtResponse jwtResponse=new JwtResponse(accessToken,refreshToken,dbUser);
//
//            return ResponseEntity.ok(jwtResponse);
//
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Refresh Token");

    }



//    @PutMapping("/user")
//    public ResponseEntity<?> getUser(@RequestBody UserEntity user){
//        System.out.println("hello");
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String userName = authentication.getName();
//        UserEntity dbUser=userModal.findByUser(userName);
//        dbUser.setUserName(user.getUsername());
//        dbUser.setPassword(user.getPassword());
//        UserEntity saveUser = userModal.signUp(dbUser);
//        return ResponseEntity.status(HttpStatus.OK).body(saveUser);
//    }


    public String checkForExistingUser(UserEntity user) {

        boolean existingUserByEmail = userModal.findExistingEmail(user.getEmail());
        if (existingUserByEmail) {
            return "Email already exists";
        }


        boolean existingUserByUsername = userModal.findByUsername(user.getUsername());
        if (existingUserByUsername) {
            return "Username already exists";
        }


        boolean existingUserByMobile = userModal.findByMobileNo(user.getPhoneNumber());
        if (existingUserByMobile) {
            return "Mobile number already exists";
        }

        return null;
    }


}