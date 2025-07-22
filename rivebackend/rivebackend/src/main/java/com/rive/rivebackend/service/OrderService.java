package com.rive.rivebackend.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.rive.rivebackend.Dto.OrderedProducts.OrderRequest;
import com.rive.rivebackend.Dto.OrderedProducts.OrderResponse;
import com.rive.rivebackend.Dto.OrderedProducts.OrderedProduct;
import com.rive.rivebackend.entity.OrderEntity;
import com.rive.rivebackend.entity.UserEntity;
import com.rive.rivebackend.model.OrderModel;
import com.rive.rivebackend.repository.OrderRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService implements OrderModel {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserService userService;


    @Value("${razorpay_key}")
    private String RAZORPAY_KEY;

    @Value("${razorpay_secret}")
    private String RAZORPAY_SECRET;

    @Override
    public OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException {
       OrderEntity newOrder=convertToEntity(request);

       newOrder=orderRepository.save(newOrder);


        RazorpayClient razorpayClient=new RazorpayClient(RAZORPAY_KEY,RAZORPAY_SECRET);
        JSONObject orderedRequest=new JSONObject();
        orderedRequest.put("amount",newOrder.getAmount()*100);
        orderedRequest.put("currency","INR");
        orderedRequest.put("payment_capture",1);


        Order razorpayOrder=razorpayClient.orders.create(orderedRequest);
        newOrder.setRazorpayOrderId(razorpayOrder.get("id"));

        UserEntity userById = userService.getUserById(request.getUserId());

        newOrder.setUserId(userById.getId());
        newOrder=orderRepository.save(newOrder);

        return convertToResponse(newOrder);

    }

    @Override
    public void verifyPayment(Map<String, String> paymentData, String status) {
        String razorpayOrderId = paymentData.get("razorpay_order_id");
        OrderEntity orderEntity = orderRepository.findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new RuntimeException("Order Not Found"));

        orderEntity.setPaymentStatus(status);
        orderEntity.setRazorpaySignature(paymentData.get("razorpay_signature"));
        orderEntity.setRazorpayPaymentId(paymentData.get("razorpay_payment_id"));

        orderRepository.save(orderEntity);
    }

    @Override
    public List<OrderResponse> getUserOrders(Long userId) {
        List<OrderEntity> byUserId = orderRepository.findByUserId(userId);

       return byUserId.stream().map(entity->convertToResponse(entity))
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> getOrderOfAllUser() {
        List<OrderEntity> allOrders = orderRepository.findAll();

       return allOrders.stream()
                .map(entity->convertToResponse(entity)).collect(Collectors.toList());
    }

    @Override
    public void updateOrderStatus(long orderId, String status) {
        OrderEntity entity = orderRepository.findById(orderId)
                .orElseThrow(()->new RuntimeException("Order Not Found"));

        entity.setOrderStatus(status);

        orderRepository.save(entity);
    }

    private OrderResponse convertToResponse(OrderEntity newOrder) {
        OrderResponse orderResponse=new OrderResponse();
        orderResponse.setId(newOrder.getId());
        orderResponse.setUserId(newOrder.getUserId());
        orderResponse.setAmount(newOrder.getAmount());
        orderResponse.setUserAddress(newOrder.getUserAddress());
        orderResponse.setRazorpayOrderId(newOrder.getRazorpayOrderId());
        orderResponse.setPaymentStatus(newOrder.getPaymentStatus());
        orderResponse.setOrderStatus(newOrder.getOrderStatus());
        orderResponse.setEmail(newOrder.getEmail());
        orderResponse.setPhoneNumber(newOrder.getPhoneNumber());
        orderResponse.setOrderedProducts(newOrder.getOrderedProducts());
        return orderResponse;
    }

    private OrderEntity convertToEntity(OrderRequest request) {
        OrderEntity orderEntity=new OrderEntity();
        orderEntity.setUserId(request.getUserId());
        orderEntity.setUserAddress(request.getUserAddress());
        orderEntity.setEmail(request.getEmail());
        orderEntity.setPhoneNumber(request.getPhoneNumber());
        orderEntity.setOrderStatus(request.getOrderStatus());
        orderEntity.setAmount(request.getAmount());
        orderEntity.setOrderedProducts(request.getOrderedProduct());
        return orderEntity;
    }
}
