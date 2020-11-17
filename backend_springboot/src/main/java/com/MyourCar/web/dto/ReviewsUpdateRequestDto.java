package com.MyourCar.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReviewsUpdateRequestDto {
    private Integer score;
    private String comment;

}
