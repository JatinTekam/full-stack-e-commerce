package com.rive.rivebackend.model;


import com.rive.rivebackend.entity.UserEntity;

public interface UserModal {

    UserEntity signUp(UserEntity user);
    boolean findExistingEmail(String email);
    boolean findByUsername(String userName);
    boolean findByMobileNo(String mobileNo);
}
