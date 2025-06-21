package com.rive.rivebackend.controller;

import com.rive.rivebackend.entity.UserEntity;
import com.rive.rivebackend.model.UserModal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class UserController {


    @Autowired
    private UserModal userModal;

    @Autowired
    private AuthenticationManager authManager;


    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> userSignUp(@RequestBody UserEntity user) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (!isValidUser(user)) {
                response.put("success", false);
                response.put("message", "All fields are required: userName, email, name, password, mobileNo");
                response.put("status", 400);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }


            String conflictMessage = checkForExistingUser(user);
            if (conflictMessage != null) {
                response.put("success", false);
                response.put("message", conflictMessage);
                response.put("status", 409);
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            userModal.signUp(user);
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("status", 201);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Registration failed due to server error");
            response.put("status", 500);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserEntity user) {
        Map<String, Object> response = new HashMap<>();

            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            user.getPassword()
                    )
            );

            if (authentication.isAuthenticated()) {
                response.put("success", true);
                response.put("message", "Login successful");
                response.put("status", 200);
                response.put("username", user.getUsername());
                return ResponseEntity.ok(response);
            }


            // Consider adding token generation here
            return ResponseEntity.ok().build();

//        catch (AuthenticationException e) {
//            response.put("error", true);
//            response.put("message", "Invalid username or password");
//            response.put("status", 401);
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//        }


    }



    private boolean isValidUser(UserEntity user) {
        return user != null &&
                user.getUsername() != null && !user.getUsername().trim().isEmpty() &&
                user.getEmail() != null && !user.getEmail().trim().isEmpty() &&
                user.getName() != null && !user.getName().trim().isEmpty() &&
                user.getPassword() != null && !user.getPassword().trim().isEmpty() &&
                user.getMobileNo() != null && !user.getMobileNo().trim().isEmpty();
    }

    private String checkForExistingUser(UserEntity user) {

        boolean existingUserByEmail = userModal.findExistingEmail(user.getEmail());
        if (existingUserByEmail) {
            return "Email already exists";
        }


        boolean existingUserByUsername = userModal.findByUsername(user.getUsername());
        if (existingUserByUsername) {
            return "Username already exists";
        }


        boolean existingUserByMobile = userModal.findByMobileNo(user.getMobileNo());
        if (existingUserByMobile) {
            return "Mobile number already exists";
        }

        return null;
    }


}