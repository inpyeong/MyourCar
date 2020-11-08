package com.MyourCar.web.dto;

import com.MyourCar.domain.cars.Cars;
import lombok.Getter;

import java.util.Date;

@Getter
public class CarsListResponseDto {
    private Long id;
    private String name;
    private Double returnLocationLatitude;
    private Double returnLocationLongitude;
    private Double currentLocationLatitude;
    private Double currentLocationLongitude;
    private Date availableStartTime;
    private Date availableEndTime;
    private Integer rentFee;
    private Integer drivingFee;
    private Integer battery;

    public CarsListResponseDto(Cars entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.returnLocationLatitude = entity.getCurrentLocationLatitude();
        this.returnLocationLongitude = entity.getCurrentLocationLongitude();
        this.currentLocationLatitude = entity.getCurrentLocationLatitude();
        this.currentLocationLongitude = entity.getCurrentLocationLongitude();
        this.availableStartTime = entity.getAvailableStartTime();
        this.availableEndTime = entity.getAvailableEndTime();
        this.rentFee = entity.getRentFee();
        this.drivingFee = entity.getDrivingFee();
        this.battery = entity.getBattery();
    }

}
