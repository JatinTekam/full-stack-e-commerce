package com.rive.rivebackend.model;


import com.rive.rivebackend.entity.UserEntity;

import java.util.List;
import java.util.Optional;

public interface UserModal {

    UserEntity saveNewUser(UserEntity user);
    boolean findExistingEmail(String email);
    boolean findByUsername(String userName);
    boolean findByMobileNo(String mobileNo);
    List<UserEntity> getAllUser();
    UserEntity getUserById(long id);
    UserEntity findByUser(String userName);
    UserEntity updateUser(UserEntity user);
}
