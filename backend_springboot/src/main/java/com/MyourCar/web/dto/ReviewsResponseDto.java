package com.MyourCar.web.dto;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.reviews.Reviews;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ReviewsResponseDto {
    private Long id;
    private Integer score;
    private String comment;
    private LocalDateTime modifiedDate;

    public ReviewsResponseDto(Reviews entity) {
        this.id = entity.getId();
        this.score = entity.getScore();
        this.comment = entity.getComment();
        this.modifiedDate = entity.getModifiedDate();
    }
}
