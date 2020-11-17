package com.MyourCar.web.dto;

import com.MyourCar.domain.reports.Reports;
import lombok.Getter;

@Getter
public class ReportsResponseDto {
    private Long id;
    private String comment;
    private Integer type;
    private String firstImage;
    private String secondImage;

    public ReportsResponseDto(Reports entity) {
        this.id = entity.getId();
        this.comment = entity.getComment();
        this.type = entity.getType();
        this.firstImage = entity.getFirstImage();
        this.secondImage = entity.getSecondImage();
    }
}
