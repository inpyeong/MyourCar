package com.MyourCar.web.dto;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.Date;
import java.util.Optional;

@Getter
@NoArgsConstructor
public class CarsSaveRequestDto {
    private String name;
    private String licensePlateNumber;

    @Builder
    public CarsSaveRequestDto(String name, String licensePlateNumber) {
        this.name = name;
        this.licensePlateNumber = licensePlateNumber;
    }

    public Cars toEntity(User user){
        return Cars.builder()
                .name(name)
                .licensePlateNumber(licensePlateNumber)
                .user(user)
                .build();
    }
}

