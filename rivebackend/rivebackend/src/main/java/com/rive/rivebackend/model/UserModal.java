package com.rive.rivebackend.model;


public interface UserModal {

    //User signUp(User user);
    boolean findExistingEmail(String email);
    boolean findByUsername(String userName);
    boolean findByMobileNo(String mobileNo);
}
