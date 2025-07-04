package com.rive.rivebackend.service;

import com.rive.rivebackend.entity.UserEntity;
import com.rive.rivebackend.model.UserModal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;

    public AuthService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


    public String encodePassword(String rawPassword){
        return this.passwordEncoder.encode(rawPassword);
    }


    public boolean isValidUser(UserEntity user) {
        return user != null &&
                user.getUsername() != null && !user.getUsername().trim().isEmpty() &&
                user.getEmail() != null && !user.getEmail().trim().isEmpty() &&
                user.getName() != null && !user.getName().trim().isEmpty() &&
                user.getPassword() != null && !user.getPassword().trim().isEmpty() &&
                user.getPhoneNumber() != null && !user.getPhoneNumber().trim().isEmpty();
    }



}
