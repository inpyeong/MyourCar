package com.MyourCar.payload;

import com.MyourCar.web.dto.CarsResponseDto;
import com.MyourCar.web.dto.ServicesResponseDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse {
    private Integer status;
    private String message;

    public ApiResponse(Integer status, String message) {
        this.status = status;
        this.message = message;
    }

}
