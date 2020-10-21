package com.MyourCar.web.dto;

import com.MyourCar.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@NoArgsConstructor
public class CarsUpdateRequestDto {
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
    private User user;

    private final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");

    private Date parseDate(String date) throws ParseException {
        return new Date(DATE_FORMAT.parse(date).getTime());
    }

//    @Builder
//    public CarsUpdateRequestDto(Integer service_enable) {
//        this.service_enable = service_enable;
//    }

    @Builder
    public CarsUpdateRequestDto(String return_location, Date available_start_time_str,
                                Date available_end_time_str, Integer rent_fee, Integer driving_fee)
            throws ParseException {
        this.return_location = return_location;
        this.available_start_time = available_start_time_str;
        this.available_end_time = available_end_time_str;
        this.rent_fee = rent_fee;
        this.driving_fee = driving_fee;
    }

//    @Builder
//    public CarsUpdateRequestDto(String current_district_location, String current_detailed_location, Integer battery) {
//        this.current_detailed_location = current_detailed_location;
//        this.current_district_location = current_district_location;
//        this.battery = battery;
//    }
}
