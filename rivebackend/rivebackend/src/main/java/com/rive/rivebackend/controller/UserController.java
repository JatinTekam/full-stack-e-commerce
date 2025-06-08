package com.rive.rivebackend.controller;

import com.rive.rivebackend.entity.User;
import com.rive.rivebackend.model.UserModal;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class UserController {

    @GetMapping("/login")
    public Map<?,?> sayHello(){
        Map<String,String> list=new HashMap<>();
        list.put("Username","JatinTekam");
        list.put("Password","Jatin@123");
       return list;
    }


//    @Autowired
//    private UserModal userModal;
//
//    @PostMapping("/signup")
//    public ResponseEntity<Map<String, Object>> userSignUp(@RequestBody User user) {
//        Map<String, Object> response = new HashMap<>();
//
//        try {
//            if (!isValidUser(user)) {
//                response.put("success", false);
//                response.put("message", "All fields are required: userName, email, name, password, mobileNo");
//                response.put("status", 400);
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//            }
//
//
//            String conflictMessage = checkForExistingUser(user);
//            if (conflictMessage != null) {
//                response.put("success", false);
//                response.put("message", conflictMessage);
//                response.put("status", 409);
//                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
//            }
//
//            userModal.signUp(user);
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
//    }
//
//    private boolean isValidUser(User user) {
//        return user != null &&
//                user.getUserName() != null && !user.getUserName().trim().isEmpty() &&
//                user.getEmail() != null && !user.getEmail().trim().isEmpty() &&
//                user.getName() != null && !user.getName().trim().isEmpty() &&
//                user.getPassword() != null && !user.getPassword().trim().isEmpty() &&
//                user.getMobileNo() != null && !user.getMobileNo().trim().isEmpty();
//    }
//
//    private String checkForExistingUser(User user) {
//
//        boolean existingUserByEmail = userModal.findExistingEmail(user.getEmail());
//        if (existingUserByEmail) {
//            return "Email already exists";
//        }
//
//
//        boolean existingUserByUsername = userModal.findByUsername(user.getUserName());
//        if (existingUserByUsername) {
//            return "Username already exists";
//        }
//
//
//        boolean existingUserByMobile = userModal.findByMobileNo(user.getMobileNo());
//        if (existingUserByMobile) {
//            return "Mobile number already exists";
//        }
//
//        return null;
//    }
}