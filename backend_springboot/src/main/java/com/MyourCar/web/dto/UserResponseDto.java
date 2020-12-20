package com.MyourCar.web.dto;

import com.MyourCar.domain.user.AuthProvider;
import com.MyourCar.domain.user.User;
import com.MyourCar.security.UserPrincipal;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserResponseDto {

    private Long id;
    private String name;
    private String phoneNumber;
    private String email;
    private String password;
    private Integer state;
    private Integer warning;
    private String imageUrl;
    private AuthProvider provider;

    public UserResponseDto(UserPrincipal entity) {
        this.id = entity.getId();
        this.name = entity.getUsername();
        this.phoneNumber = entity.getPhoneNumber();
        this.email = entity.getEmail();
        this.password = entity.getPassword();
        this.imageUrl = entity.getImageUrl();
        this.provider = entity.getProvider();
        this.state = entity.getState();
        this.warning = entity.getWarning();
    }

}
