package com.rive.rivebackend.Dto.user;

public class UserSignUpRequest {

    private String name;

    private String email;

    private String password;

    private String username;

    private String phoneNumber;

    UserSignUpRequest(){};

    public UserSignUpRequest(String name, String email, String password, String username, String phoneNumber) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.username = username;
        this.phoneNumber = phoneNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
