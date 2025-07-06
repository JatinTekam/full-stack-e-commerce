package com.rive.rivebackend.errors;

public class UserValidate extends RuntimeException{

    public UserValidate(String msg){
        super(msg);
    }
}
