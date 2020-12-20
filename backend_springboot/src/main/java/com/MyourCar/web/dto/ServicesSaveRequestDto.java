package com.MyourCar.web.dto;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.reviews.Reviews;
import com.MyourCar.domain.services.Services;
import com.MyourCar.domain.user.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.sql.Timestamp;
import java.util.Date;

@Getter
@NoArgsConstructor
public class ServicesSaveRequestDto {
    private Double callLocationLatitude;
    private Double callLocationLongitude;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private Timestamp serviceStartTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private Timestamp serviceEndTime;
    private String parkingType;
    private Long userId;
    private Long carId;

    @Builder
    public ServicesSaveRequestDto(Double callLocationLatitude, Double callLocationLongitude, Timestamp serviceStartTime,
                                  Timestamp serviceEndTime, String parkingType, Long userId, Long carId) {
        this.callLocationLatitude = callLocationLatitude;
        this.callLocationLongitude = callLocationLongitude;
        this.serviceStartTime = serviceStartTime;
        this.serviceEndTime = serviceEndTime;
        this.parkingType = parkingType;
        this.userId = userId;
        this.carId = carId;
    }

    public Services toEntity(User user, Cars cars){
        return Services.builder()
                .callLocationLatitude(callLocationLatitude)
                .callLocationLongitude(callLocationLongitude)
                .serviceStartTime(serviceStartTime)
                .serviceEndTime(serviceEndTime)
                .parkingType(parkingType)
                .user(user)
                .cars(cars)
                .build();
    }
}

