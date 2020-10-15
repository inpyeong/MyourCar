package com.MyourCar.web.dto;

import com.MyourCar.domain.cars.Cars;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CarsSaveRequestDto {
    private String name;
    private String title;

    @Builder
    public CarsSaveRequestDto(String name, String title) {
        this.name = name;
        this.title = title;
    }

    public Cars toEntity(){
        return Cars.builder()
                .name(name)
                .build();
    }
}

