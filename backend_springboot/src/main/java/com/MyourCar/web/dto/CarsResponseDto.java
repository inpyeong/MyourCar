package com.MyourCar.web.dto;

import com.MyourCar.domain.cars.Cars;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class CarsResponseDto {
    private Long id;
    private String name;
    private String phoneNumber;
    private String email;
    private Integer state;
    private String address;
    private Integer warning;

    public CarsResponseDto(Cars entity) {
        this.id = entity.getId();
    }
}
