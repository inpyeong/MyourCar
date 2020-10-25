package com.MyourCar.web.dto;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.reviews.Reviews;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.ManyToOne;

@Getter
@Setter
@NoArgsConstructor
public class ReviewsResponseDto {
    private Long id;
    private Integer score;
    private String comment;

    public ReviewsResponseDto(Reviews entity) {
        this.id = entity.getId();
    }
}
