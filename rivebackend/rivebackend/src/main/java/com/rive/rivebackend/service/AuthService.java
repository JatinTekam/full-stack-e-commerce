package com.rive.rivebackend.service;

import com.rive.rivebackend.Dto.User.UserSignUpRequest;
import com.rive.rivebackend.errors.UserValidate;
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


    public void validateUser(UserSignUpRequest user) throws UserValidate {
        String msg="";
         if (user.getUsername().length() < 3 || user.getUsername().length() > 30 ){
            msg="Username must be between 3 and 30 characters";
         }

         if(user.getPhoneNumber().length()!=10){
             msg="Please provide a valid phone number";
         } else if (!user.getPhoneNumber().matches("^[6-9]\\d{9}$")) {
            msg="Please provide a valid 10-digit phone number starting with 6-9";
         }

        if ((user.getFirstName().length() > 2 && user.getFirstName().length() > 50) || (user.getLastName().length() < 2 && user.getLastName().length() > 50)){
             msg="Firstname and Lastname must be less then 50";
         }
          if (user.getPassword().length() < 8){
             msg="Password must be at least 8 characters long";
         }
          if (user.getEmail().length() > 50) {
             msg="Email not contain more then 50 characters";
         }

          if (!msg.isEmpty()){
              throw new UserValidate(msg);
          }

    }



}
