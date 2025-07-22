package com.rive.rivebackend.repository;

import com.rive.rivebackend.entity.OrderEntity;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderEntity,Long> {

   List<OrderEntity> findByUserId(long userId);

   Optional<OrderEntity>findByRazorpayOrderId(String razorpayOrderId);
}
