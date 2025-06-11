package com.rive.rivebackend.repository;

import com.rive.rivebackend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {

    UserEntity findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByUserName(String userName);
    boolean existsByMobileNo(String mobileNo);
}
