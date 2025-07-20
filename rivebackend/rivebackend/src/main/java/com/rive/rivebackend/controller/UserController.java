package com.rive.rivebackend.controller;
import com.rive.rivebackend.Dto.JwtToken.RefreshTokenResponse;

import com.rive.rivebackend.Dto.JwtToken.RefreshTokenRequest;
import com.rive.rivebackend.Dto.User.*;
import com.rive.rivebackend.entity.UserEntity;
import com.rive.rivebackend.errors.UserAlreadyExistsException;
import com.rive.rivebackend.errors.UserValidate;
import com.rive.rivebackend.model.UserModel;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserModel userModal;


    public UserController(UserModel userModal) {
        this.userModal = userModal;
    }


    @PostMapping("/signup")
    public ResponseEntity<?> userSignUp(@RequestBody UserSignUpRequest user){
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
        Map<String,Object> errMsg=new HashMap<>();
        try{

            UserLogInResponse userLogInResponse = userModal.loginUser(user, response);
            return ResponseEntity.status(HttpStatus.OK).body(userLogInResponse);

        }catch (UserValidate e){
            errMsg.put("message",e.getMessage());
            errMsg.put("status",404);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errMsg);
        }

    }

    @PostMapping("/user")
    public ResponseEntity<?> getUser(@RequestBody GetUser user){
        Map<String,Object> errMsg=new HashMap<>();
        try{
            SetUser logInUser= userModal.findByUser(user.getUsername());
            return ResponseEntity.status(HttpStatus.OK).body(logInUser);
        }catch (UserValidate e){
            errMsg.put("message",e.getMessage());
            errMsg.put("status",409);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errMsg);
        }



    }



    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@CookieValue(name = "refreshCookie",required = false) String refreshCookie,RefreshTokenRequest request,HttpServletResponse response) {

        try {
            RefreshTokenResponse refreshToken  = userModal.refreshToken(refreshCookie, request, response);
            return ResponseEntity.status(HttpStatus.OK).body(refreshToken);
        }catch (UserValidate e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }



    @PutMapping("/update-user")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdateRequest request){
        Map<String,Object> errMsg=new HashMap<>();
        try{
            UpdateUserResponse updateUserResponse = userModal.updateUserDetails(request);
            return ResponseEntity.status(HttpStatus.OK).body(updateUserResponse);
        }catch (UserValidate e){
            errMsg.put("error",e.getMessage());
            errMsg.put("status",404);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errMsg);
        }

    }


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