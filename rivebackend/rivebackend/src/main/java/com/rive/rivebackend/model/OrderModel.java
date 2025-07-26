package com.rive.rivebackend.model;

import com.razorpay.RazorpayException;
import com.rive.rivebackend.Dto.OrderedProducts.OrderRequest;
import com.rive.rivebackend.Dto.OrderedProducts.OrderResponse;
import com.rive.rivebackend.Dto.OrderedProducts.OrderedProduct;

import java.util.List;
import java.util.Map;

public interface OrderModel {

    OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException;

    void verifyPayment(Map<String,String> paymentData, String status);

    List<OrderResponse> getUserOrders(Long userId);

    List<OrderResponse> getOrderOfAllUser();

    void updateOrderStatus(long orderId,String status);

    void deleteOrder(long orderId);
}
