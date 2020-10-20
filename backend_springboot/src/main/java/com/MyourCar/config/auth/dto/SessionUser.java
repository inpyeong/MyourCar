package com.MyourCar.config.auth.dto;

import com.MyourCar.domain.user.User;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {
    private String name;
    private String phoneNumber;
    private String email;
    private Integer state;
    private String address;
    private Integer warning;

    public SessionUser(User user) {
        this.name = user.getName();
        this.phoneNumber = user.getPhoneNumber();
        this.email = user.getEmail();
        this.state = user.getState();
        this.address = user.getAddress();
        this.warning = user.getWarning();
    }
}
