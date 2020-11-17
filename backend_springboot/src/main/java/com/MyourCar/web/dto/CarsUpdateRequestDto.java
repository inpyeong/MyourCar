package com.MyourCar.web.dto;

import com.MyourCar.domain.user.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@NoArgsConstructor
public class CarsUpdateRequestDto {
    private String name;
    private Integer serviceEnable;
    private Double returnLocationLatitude;
    private Double returnLocationLongitude;
    private Double currentLocationLatitude;
    private Double currentLocationLongitude;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private Timestamp availableStartTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private Timestamp availableEndTime;
    private Integer rentFee;
    private Integer drivingFee;
    private Integer battery;

}
