package com.rive.rivebackend.model;

import com.rive.rivebackend.entity.UserEntity;
import com.rive.rivebackend.repository.UserRepository;
import com.rive.rivebackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class UserService implements UserModal{

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserEntity signUp(UserEntity user) {
        String encodedPassword=authService.encodePassword(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
        return user;
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
        return userRepository.existsByMobileNo(mobileNo);
    }

}
