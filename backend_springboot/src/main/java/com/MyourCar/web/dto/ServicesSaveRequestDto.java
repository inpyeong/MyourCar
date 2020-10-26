package com.MyourCar.web.dto;

import com.MyourCar.domain.reviews.Reviews;
import com.MyourCar.domain.services.Services;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Getter
@NoArgsConstructor
public class ServicesSaveRequestDto {
    private String call_location;
    private Date service_start_time;
    private Date service_end_time;
    private String parking_type;


    @Builder
    public ServicesSaveRequestDto(String call_location, Date service_start_time, Date service_end_time, String parking_type) {
        this.call_location = call_location;
        this.service_start_time = service_start_time;
        this.service_end_time = service_end_time;
        this.parking_type = parking_type;
    }

    public Services toEntity(){
        return Services.builder()
                .call_location(call_location)
                .service_start_time(service_start_time)
                .service_end_time(service_end_time)
                .parking_type(parking_type)
                .build();
    }
}

