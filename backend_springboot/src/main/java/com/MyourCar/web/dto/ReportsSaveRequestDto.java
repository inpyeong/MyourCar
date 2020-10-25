package com.MyourCar.web.dto;

import com.MyourCar.domain.reports.Reports;
import com.MyourCar.domain.services.Services;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class ReportsSaveRequestDto {
    private String comment;
    private Integer type;


    @Builder
    public ReportsSaveRequestDto(String comment, Integer type){
        this.comment = comment;
        this.type = type;
    }

    public Reports toEntity(){
        return Reports.builder()
                .comment(comment)
                .type(type)
                .build();
    }
}

