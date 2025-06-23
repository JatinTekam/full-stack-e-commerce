package com.rive.rivebackend.Dto;

import com.rive.rivebackend.entity.UserEntity;

public record JwtResponse(
        String accessToken,
        String refreshToken,
        UserEntity user) {


}
