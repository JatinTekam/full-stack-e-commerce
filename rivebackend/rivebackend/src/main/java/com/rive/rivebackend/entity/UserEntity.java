package com.rive.rivebackend.entity;


import jakarta.persistence.*;

@Entity
@Table
public class UserEntity {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String name;

    @Column(unique = true)
    private String userName;

    @Column
    private String password;

    @Column(unique = true)
    private String email;

    @Column
    private String mobileNo;

    @Column
    private boolean userIsEnabled=false;


    public boolean isUserEnabled() {
        return userIsEnabled;
    }

    public void setUserEnabled(boolean userEnabled) {
        this.userIsEnabled = userEnabled;
    }



    public String getName() {
        return name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }




}
