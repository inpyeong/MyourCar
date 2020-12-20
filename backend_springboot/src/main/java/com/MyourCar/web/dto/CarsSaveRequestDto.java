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
    private String certificateImage;
    private String frontImage;
    private String backImage;
    private String rightImage;
    private String leftImage;

    @Builder
    public CarsSaveRequestDto(String name, String licensePlateNumber, String certificateImage, String frontImage,
                              String backImage, String rightImage, String leftImage) {
        this.name = name;
        this.licensePlateNumber = licensePlateNumber;
        this.certificateImage = certificateImage;
        this.frontImage = frontImage;
        this.backImage = backImage;
        this.rightImage = rightImage;
        this.leftImage = leftImage;
    }

    public Cars toEntity(User user){
        return Cars.builder()
                .name(name)
                .licensePlateNumber(licensePlateNumber)
                .certificateImage(certificateImage)
                .frontImage(frontImage)
                .backImage(backImage)
                .rightImage(rightImage)
                .leftImage(leftImage)
                .user(user)
                .build();
    }
}

