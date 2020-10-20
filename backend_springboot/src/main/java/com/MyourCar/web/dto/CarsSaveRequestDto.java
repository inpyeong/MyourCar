package com.MyourCar.web.dto;

import com.MyourCar.domain.cars.Cars;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.Date;

@Getter
@NoArgsConstructor
public class CarsSaveRequestDto {
    private String name;
    private Integer service_enable;
    private String return_location;
    private String current_detailed_location;
    private String current_district_location;
    private Date available_start_time;
    private Date available_end_time;
    private Integer rent_fee;
    private Integer driving_fee;
    private Integer battery;

    @Builder
    public CarsSaveRequestDto(String name, Integer service_enable, String return_location,
                              String current_detailed_location, String current_district_location,
                              Date available_start_time, Date available_end_time, Integer rent_fee,
                              Integer driving_fee, Integer battery) {
        this.name = name;
        this.service_enable = service_enable;
        this.return_location = return_location;
        this.current_detailed_location = current_detailed_location;
        this.current_district_location = current_district_location;
        this.available_start_time = available_start_time;
        this.available_end_time = available_end_time;
        this.rent_fee = rent_fee;
        this.driving_fee = driving_fee;
        this.battery = battery;
    }

    public Cars toEntity(){
        return Cars.builder()
                .name(name)
                .service_enable(service_enable)
                .return_location(return_location)
                .current_detailed_location(current_detailed_location)
                .current_district_location(current_district_location)
                .available_start_time(available_start_time)
                .available_end_time(available_end_time)
                .rent_fee(rent_fee)
                .driving_fee(driving_fee)
                .battery(battery)
                .build();
    }
}

