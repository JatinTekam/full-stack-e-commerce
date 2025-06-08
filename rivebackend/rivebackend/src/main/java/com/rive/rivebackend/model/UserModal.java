package com.rive.rivebackend.model;


import com.rive.rivebackend.entity.User;

public interface UserModal {

    //User signUp(User user);
    boolean findExistingEmail(String email);
    boolean findByUsername(String userName);
    boolean findByMobileNo(String mobileNo);
}
