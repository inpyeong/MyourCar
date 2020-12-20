package com.MyourCar.web.dto;

import com.MyourCar.domain.cars.Cars;
import lombok.Getter;

import java.util.Date;

@Getter
public class CarsListResponseDto {
    private Long id;
    private String name;
    private Integer serviceEnable;
    private Double returnLocationLatitude;
    private Double returnLocationLongitude;
    private Double currentLocationLatitude;
    private Double currentLocationLongitude;
    private Date availableStartTime;
    private Date availableEndTime;
    private Integer rentFee;
    private Integer timeFee;
    private Integer battery;

    public CarsListResponseDto(Cars entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.serviceEnable = entity.getServiceEnable();
        this.returnLocationLatitude = entity.getReturnLocationLatitude();
        this.returnLocationLongitude = entity.getReturnLocationLongitude();
        this.currentLocationLatitude = entity.getCurrentLocationLatitude();
        this.currentLocationLongitude = entity.getCurrentLocationLongitude();
        this.availableStartTime = entity.getAvailableStartTime();
        this.availableEndTime = entity.getAvailableEndTime();
        this.rentFee = entity.getRentFee();
        this.timeFee = entity.getTimeFee();
        this.battery = entity.getBattery();
    }

}
