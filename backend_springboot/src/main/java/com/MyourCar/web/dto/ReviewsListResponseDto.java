package com.MyourCar.web.dto;

import com.MyourCar.domain.reviews.Reviews;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ReviewsListResponseDto {
    private Long id;
    private Integer score;
    private String comment;
    private LocalDateTime modifiedDate;
    private String image;

    public ReviewsListResponseDto(Reviews entity) {
        this.id = entity.getId();
        this.score = entity.getScore();
        this.comment = entity.getComment();
        this.modifiedDate = entity.getModifiedDate();
        this.image = entity.getImage();
    }
}
