package com.MyourCar.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequestDto {
    private String password;
    private String phoneNumber;
    private Integer state;
    private Integer warning;

}
