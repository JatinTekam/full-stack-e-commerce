package com.rive.rivebackend.model;


import com.rive.rivebackend.Dto.JwtToken.RefreshTokenRequest;
import com.rive.rivebackend.Dto.JwtToken.RefreshTokenResponse;
import com.rive.rivebackend.Dto.User.*;
import com.rive.rivebackend.entity.UserEntity;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

public interface UserModel {

    UserSignUpResponse saveNewUser(UserSignUpRequest request);
    UserLogInResponse loginUser(UserLogInRequest request, HttpServletResponse response);
    boolean findExistingEmail(String email);
    boolean findByUsername(String username);
    boolean findByMobileNo(String mobileNo);
    List<UserEntity> getAllUser();
    UserEntity getUserById(long id);
    SetUser findByUser(String username);
    UserUpdateResponse updateUserDetails(UserUpdateRequest request);
    RefreshTokenResponse refreshToken(String token, RefreshTokenRequest request, HttpServletResponse response);
}
