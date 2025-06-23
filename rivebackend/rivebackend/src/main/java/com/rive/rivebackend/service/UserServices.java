package com.rive.rivebackend.service;

import com.rive.rivebackend.entity.UserEntity;
import com.rive.rivebackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServices implements UserDetailsService {

    @Autowired
    private final UserRepository userRepository;

    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

     UserEntity user=userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("Email Not Found"));

     return new CustomUserDetails(user);

    }
}
