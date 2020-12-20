package com.MyourCar.web.dto;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.reviews.Reviews;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class ReviewsSaveRequestDto {
    private Integer score;
    private String comment;
    private String image;

    @Builder
    public ReviewsSaveRequestDto(Integer score, String comment, String image) {
        this.score = score;
        this.comment = comment;
        this.image = image;
    }

    public Reviews toEntity(Cars cars){
        return Reviews.builder()
                .score(score)
                .comment(comment)
                .image(image)
                .cars(cars)
                .build();
    }
}

