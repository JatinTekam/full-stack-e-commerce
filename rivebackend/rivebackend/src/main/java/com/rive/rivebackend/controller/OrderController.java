package com.rive.rivebackend.controller;

import com.rive.rivebackend.entity.OrderEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/orders")
public class OrderController {

    @PostMapping("/place-order")
    public ResponseEntity<?> placeOrder(@RequestBody List<OrderEntity> orderProduct) {
        System.out.println("Received products: " + orderProduct);

       for(OrderEntity order:orderProduct){
           System.out.println(order.getCategory());
           System.out.println(order.getColor());
           System.out.println(order.getId());
           System.out.println(order.getPrice());
           System.out.println(order.getQuantity());
           System.out.println("--------------------------");
       }


        return ResponseEntity.ok(HttpStatus.OK);
    }
}

