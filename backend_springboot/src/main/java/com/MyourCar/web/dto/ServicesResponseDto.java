package com.MyourCar.web.dto;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.services.Services;
import com.MyourCar.domain.user.User;
import com.MyourCar.security.UserPrincipal;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class ServicesResponseDto {
    private Long id;
    private Double callLocationLatitude;
    private Double callLocationLongitude;
    private Timestamp serviceStartTime;
    private Timestamp serviceEndTime;
    private UserResponseDto user;
    private CarsResponseDto cars;

    public ServicesResponseDto(Services entity) {
        this.id = entity.getId();
        this.callLocationLatitude = entity.getCallLocationLatitude();
        this.callLocationLongitude = entity.getCallLocationLongitude();
        this.serviceStartTime = entity.getServiceStartTime();
        this.serviceEndTime = entity.getServiceEndTime();
        this.cars = new CarsResponseDto(entity.getCars());
    }
    public ServicesResponseDto(Services entity, UserPrincipal userPrincipal) {
        this.id = entity.getId();
        this.callLocationLatitude = entity.getCallLocationLatitude();
        this.callLocationLongitude = entity.getCallLocationLongitude();
        this.serviceStartTime = entity.getServiceStartTime();
        this.serviceEndTime = entity.getServiceEndTime();
        this.user = new UserResponseDto(userPrincipal);
    }
}
