//package com.rive.rivebackend.controller;
//
//import com.rive.rivebackend.entity.UserEntity;
//import com.rive.rivebackend.model.UserModal;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/user")
//public class UpdateUserController {
//
//
//    private final UserModal userModal;
//
//
//
//    public UpdateUserController(UserModal userModal) {
//        this.userModal = userModal;
//    }
//
//    @PutMapping
//    public ResponseEntity<?> getUser(@RequestBody UserEntity user){
//        System.out.println("hello");
////        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
////        String userName = authentication.getName();
//        UserEntity dbUser=userModal.findByUser(user.getUsername());
//        dbUser.setPhoneNumber(user.getPhoneNumber());
//        UserEntity saveUser = userModal.updateUser(dbUser);
//        return ResponseEntity.status(HttpStatus.OK).body(saveUser);
//    }
//}
