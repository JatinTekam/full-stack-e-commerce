package com.rive.rivebackend.service;

import com.rive.rivebackend.entity.UserEntity;
import com.rive.rivebackend.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserExists implements UserDetailsService {

    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserEntity existingUser=userRepository.findByEmail(email);
        if (existingUser!=null){
            return new User(existingUser.getEmail(),existingUser.getPassword(),new ArrayList<>());
        }

        throw new UsernameNotFoundException("Email Not Found "+email);

    }
}
