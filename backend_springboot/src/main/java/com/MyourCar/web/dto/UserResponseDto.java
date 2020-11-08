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
    private String address;
    private Integer warning;
    private String imageUrl;
    private AuthProvider provider;

    public UserResponseDto(UserPrincipal entity) {
        this.id = entity.getId();
        this.name = entity.getUsername();
        this.phoneNumber = "01033637093";
        this.email = entity.getEmail();
        this.password = entity.getPassword();
        this.imageUrl = entity.getImageUrl();
        this.provider = entity.getProvider();
    }

}
