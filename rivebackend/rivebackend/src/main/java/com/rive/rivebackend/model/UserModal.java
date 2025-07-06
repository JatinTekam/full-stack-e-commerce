package com.rive.rivebackend.model;


import com.rive.rivebackend.Dto.user.UserLogInRequest;
import com.rive.rivebackend.Dto.user.UserLogInResponse;
import com.rive.rivebackend.Dto.user.UserSignUpRequest;
import com.rive.rivebackend.Dto.user.UserSignUpResponse;
import com.rive.rivebackend.entity.UserEntity;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;
import java.util.Optional;

public interface UserModal {

    UserSignUpResponse saveNewUser(UserSignUpRequest request);
    UserLogInResponse loginUser(UserLogInRequest request, HttpServletResponse response);
    boolean findExistingEmail(String email);
    boolean findByUsername(String userName);
    boolean findByMobileNo(String mobileNo);
    List<UserEntity> getAllUser();
    UserEntity getUserById(long id);
    UserEntity findByUser(String userName);
    UserEntity updateUser(UserEntity user);
}
