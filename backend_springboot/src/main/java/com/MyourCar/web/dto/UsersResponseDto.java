package com.MyourCar.web.dto;

import com.MyourCar.domain.users.Users;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UsersResponseDto {

    private Long id;
    private String name;
    private String phoneNumber;
    private String email;
    private Integer state;
    private String address;
    private Integer warning;

    public UsersResponseDto(Users entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.phoneNumber = entity.getPhoneNumber();
        this.email = entity.getEmail();
        this.state = entity.getState();
        this.address = entity.getAddress();
        this.warning = entity.getWarning();
    }

}
