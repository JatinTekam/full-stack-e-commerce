package com.rive.rivebackend.Dto.OrderedProducts;

import jakarta.persistence.Embeddable;

@Embeddable
public class OrderedProduct {
    private int productId;
    private String url;
    private String title;
    private String category;
    private String color;
    private String description;
    private Double price;
    private Integer quantity;
    private Double rating;
    private String size;

    public OrderedProduct(){}

    public OrderedProduct(int productId, String url, String title, String category, String color, String description, Double price, Integer quantity, Double rating, String size) {
        this.productId = productId;
        this.url = url;
        this.title = title;
        this.category = category;
        this.color = color;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.rating = rating;
        this.size = size;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }
}