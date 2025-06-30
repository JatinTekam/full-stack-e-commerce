package com.rive.rivebackend.model;

import com.rive.rivebackend.entity.UserEntity;
import com.rive.rivebackend.repository.UserRepository;
import com.rive.rivebackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserService implements UserModal{

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserEntity saveNewUser(UserEntity user) {
        String encodedPassword=authService.encodePassword(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
        return user;
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
        return userRepository.existsByMobileNo(mobileNo);
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
