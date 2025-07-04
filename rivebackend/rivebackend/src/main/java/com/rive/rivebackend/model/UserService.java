package com.rive.rivebackend.model;

import com.rive.rivebackend.Dto.user.UserSignUpRequest;
import com.rive.rivebackend.Dto.user.UserSignUpResponse;
import com.rive.rivebackend.entity.UserEntity;
import com.rive.rivebackend.errors.UserAlreadyExistsException;
import com.rive.rivebackend.repository.UserRepository;
import com.rive.rivebackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class UserService implements UserModal{

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserSignUpResponse saveNewUser(UserSignUpRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
                throw new UserAlreadyExistsException("User with email " + request.getEmail() + " already exists");
            }

        UserEntity user=new UserEntity();
        user.setEmail(request.getEmail());
        user.setUserName(request.getUsername());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setUserIsEnabled(true);
        user.setPassword(authService.encodePassword(request.getPassword()));
        user.setName(request.getName());
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        UserSignUpResponse response=new UserSignUpResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setCreatedAt(user.getCreatedAt());
        response.setActive(user.getUserIsEnabled());
        response.setMessage("User registered successfully");

        return response;
    }

    public List<UserEntity> getAllUser(){
        return userRepository.findAll();
    }

    @Override
    public UserEntity getUserById(long id) {
        Optional<UserEntity> user=userRepository.findById(id);
        return user.orElse(null);
    }

    public boolean findExistingEmail(String email){
      return userRepository.existsByEmail(email);
    }

    @Override
    public boolean findByUsername(String userName) {
      return userRepository.existsByUserName(userName);
    }

    @Override
    public boolean findByMobileNo(String mobileNo) {
        return userRepository.existsByPhoneNumber(mobileNo);
    }

    @Override
    public UserEntity updateUser(UserEntity user){
       return userRepository.save(user);
    }

    @Override
    public UserEntity findByUser(String userName){
        UserEntity user = userRepository.findByUserName(userName);

        if (user!=null){
            return user;
        }

        return null;

    }
}
