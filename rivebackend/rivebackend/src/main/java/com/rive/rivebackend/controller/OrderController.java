package com.rive.rivebackend.controller;

import com.razorpay.RazorpayException;
import com.rive.rivebackend.Dto.OrderedProducts.OrderRequest;
import com.rive.rivebackend.Dto.OrderedProducts.OrderResponse;
import com.rive.rivebackend.Dto.OrderedProducts.OrderedProduct;
import com.rive.rivebackend.entity.OrderEntity;
import com.rive.rivebackend.model.OrderModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderModel orderModel;

    public OrderController(OrderModel orderModel) {
        this.orderModel = orderModel;
    }

    @PostMapping("/place-order")
    public OrderResponse placeOrder(@RequestBody OrderRequest orderRequest) throws RazorpayException {
        return orderModel.createOrderWithPayment(orderRequest);
    }

    @PostMapping("/verify")
    public void verifyPayment(@RequestBody Map<String,String> paymentData){
        orderModel.verifyPayment(paymentData,"Paid");
    }


    @GetMapping("/order/{userId}")
    public List<OrderResponse> getOrders(@PathVariable Long userId){
        return orderModel.getUserOrders(userId);
    }

    @GetMapping("/all")
    public List<OrderResponse> allOrders(){
       return orderModel.getOrderOfAllUser();
    }



}

