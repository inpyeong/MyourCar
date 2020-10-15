package com.MyourCar.web;

import com.MyourCar.domain.cars.Cars;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class CarsResponseDto {
    private Long id;
    private String name;
    private String phoneNumber;
    private String email;
    private Integer state;
    private String address;
    private Integer warning;

    public Cars toEntity(){
        Cars build = Cars.builder()
                .id(id)
                .name(name)
                .phoneNumber(phoneNumber)
                .email(email)
                .state(state)
                .address(address)
                .warning(warning)
                .build();
        return build;
    }

    @Builder
    public CarsResponseDto(Cars entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.phoneNumber = entity.getPhoneNumber();
        this.email = entity.getEmail();
        this.state = entity.getState();
        this.address = entity.getAddress();
        this.warning = entity.getWarning();
    }
}
