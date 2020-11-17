package com.MyourCar.web.dto;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.reviews.Reviews;
import com.MyourCar.domain.services.Services;
import com.MyourCar.domain.user.User;
import lombok.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class CarsResponseDto {
    private Long id;
    private String name;
    private String licensePlateNumber;
    private Integer serviceEnable;
    private Double returnLocationLatitude;
    private Double returnLocationLongitude;
    private Double currentLocationLatitude;
    private Double currentLocationLongitude;
    private Timestamp availableStartTime;
    private Timestamp availableEndTime;
    private Integer rentFee;
    private Integer drivingFee;
    private Integer battery;

    public CarsResponseDto(Cars entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.licensePlateNumber = entity.getLicensePlateNumber();
        this.serviceEnable = entity.getServiceEnable();
        this.returnLocationLatitude = entity.getReturnLocationLatitude();
        this.returnLocationLongitude = entity.getReturnLocationLongitude();
        this.currentLocationLatitude = entity.getCurrentLocationLatitude();
        this.currentLocationLongitude = entity.getCurrentLocationLongitude();
        this.availableStartTime = entity.getAvailableStartTime();
        this.availableEndTime = entity.getAvailableEndTime();
        this.rentFee = entity.getRentFee();
        this.drivingFee = entity.getDrivingFee();
        this.battery = entity.getBattery();
    }
}
