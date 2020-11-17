package com.MyourCar.web.dto;

import com.MyourCar.domain.reviews.Reviews;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ReviewsListResponseDto {
    private Integer score;
    private String comment;
    private LocalDateTime modifiedDate;

    public ReviewsListResponseDto(Reviews entity) {
        this.score = entity.getScore();
        this.comment = entity.getComment();
        this.modifiedDate = entity.getModifiedDate();
    }
}
