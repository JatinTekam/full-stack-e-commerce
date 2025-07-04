package com.rive.rivebackend.controller;
import com.rive.rivebackend.Dto.AuthRequest;
import com.rive.rivebackend.Dto.JwtResponse;
import com.rive.rivebackend.Dto.LoginResponse;
import com.rive.rivebackend.Dto.RefreshTokenRequest;
import com.rive.rivebackend.Dto.user.UserSignUpRequest;
import com.rive.rivebackend.Dto.user.UserSignUpResponse;
import com.rive.rivebackend.entity.UserEntity;
import com.rive.rivebackend.errors.UserAlreadyExistsException;
import com.rive.rivebackend.model.UserModal;
import com.rive.rivebackend.repository.UserRepository;
import com.rive.rivebackend.service.AuthService;
import com.rive.rivebackend.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
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
        }catch (UserAlreadyExistsException e){
            errMsg.put("message",e.getMessage());
            errMsg.put("status",409);
           return ResponseEntity.status(HttpStatus.CONFLICT).body(errMsg);
        }

//        try {
//            if (!service.isValidUser(user)) {
//                response.put("success", false);
//                response.put("message", "All fields are required: userName, email, name, password, mobileNo");
//                response.put("status", 400);
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//            }
//
//
//            String conflictMessage = checkForExistingUser(user);
//
//            if (conflictMessage != null) {
//                response.put("success", false);
//                response.put("message", conflictMessage);
//                response.put("status", 409);
//                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
//            }
//
//            userModal.saveNewUser(user);
//            response.put("success", true);
//            response.put("message", "User registered successfully");
//            response.put("status", 201);
//            return ResponseEntity.status(HttpStatus.CREATED).body(response);
//
//        } catch (Exception e) {
//            response.put("success", false);
//            response.put("message", "Registration failed due to server error");
//            response.put("status", 500);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//        }

    }



    @GetMapping("/allUser")
    public List<UserEntity> getAllUser(){
       return userModal.getAllUser();
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest user, HttpServletResponse response) {
        try{
            authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));

            String accessToken=jwtService.generateToken(user.getEmail(),true);

            String refreshToken=jwtService.generateToken(user.getEmail(),false);

            UserEntity dbUser=userRepository.findByEmail(user.getEmail()).get();

            Cookie refreshCookie=new Cookie("refreshCookie",refreshToken);
            refreshCookie.setHttpOnly(true);
            refreshCookie.setSecure(true);
            refreshCookie.setPath("/");
            refreshCookie.setMaxAge(7*24*60*60);
            response.addCookie(refreshCookie);

            LoginResponse loginResponse=new LoginResponse();
            loginResponse.setAccessToken(accessToken);
            loginResponse.setEmail(dbUser.getEmail());
            loginResponse.setExpiresIn(1200);
            loginResponse.setMessage("Welcome "+dbUser.getName());
            return ResponseEntity.ok(loginResponse);

        }catch (BadCredentialsException e){
            throw new BadCredentialsException("Invalid email or password");
        }

    }



    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest user) {

        if(jwtService.validateToken(user.refreshToken())){
         String usernameFromToken=jwtService.getUsernameFromToken(user.refreshToken());

         String accessToken=jwtService.generateToken(usernameFromToken,true);
         String refreshToken=jwtService.generateToken(usernameFromToken,false);

            UserEntity dbUser=userRepository.findByEmail(usernameFromToken).get();

            JwtResponse jwtResponse=new JwtResponse(accessToken,refreshToken,dbUser);

            return ResponseEntity.ok(jwtResponse);

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Refresh Token");
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