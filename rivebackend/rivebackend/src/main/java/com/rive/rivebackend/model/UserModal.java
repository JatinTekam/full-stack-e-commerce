package com.rive.rivebackend.model;


import com.rive.rivebackend.Dto.jwtToken.RefreshTokenRequest;
import com.rive.rivebackend.Dto.jwtToken.RefreshTokenResponse;
import com.rive.rivebackend.Dto.user.*;
import com.rive.rivebackend.entity.UserEntity;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

public interface UserModal {

    UserSignUpResponse saveNewUser(UserSignUpRequest request);
    UserLogInResponse loginUser(UserLogInRequest request, HttpServletResponse response);
    boolean findExistingEmail(String email);
    boolean findByUsername(String username);
    boolean findByMobileNo(String mobileNo);
    List<UserEntity> getAllUser();
    UserEntity getUserById(long id);
    SetUser findByUser(String username);
    UserEntity updateUser(UserEntity user);
    RefreshTokenResponse refreshToken(String token, RefreshTokenRequest request, HttpServletResponse response);
}
