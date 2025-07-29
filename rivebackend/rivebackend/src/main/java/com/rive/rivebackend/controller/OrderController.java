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
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse placeOrder(@RequestBody OrderRequest orderRequest) throws RazorpayException {
        return orderModel.createOrderWithPayment(orderRequest);
    }

    @PostMapping("/verify")
    @ResponseStatus(HttpStatus.OK)
    public void verifyPayment(@RequestBody Map<String,String> paymentData){
        orderModel.verifyPayment(paymentData,"Paid");
    }


    @GetMapping("/order/{userId}")
    public List<OrderResponse> getOrders(@PathVariable long userId){
        return orderModel.getUserOrders(userId);
    }

    @DeleteMapping("/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserOrder(@PathVariable long orderId){
        orderModel.deleteOrder(orderId);
    }



    //admin
    @GetMapping("/all")
    public List<OrderResponse> allOrders(){
       return orderModel.getOrderOfAllUser();
    }

    //admin
    @PatchMapping("/status/{orderId}")
    public void updateOrderStatus(@PathVariable long orderId,@RequestParam String status){
        orderModel.updateOrderStatus(orderId,status);
    }


}

