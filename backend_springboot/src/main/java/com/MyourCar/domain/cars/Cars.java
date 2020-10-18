package com.MyourCar.domain.cars;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Cars {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer service_enable;

    @Column(length = 100, nullable = false)
    private String return_location;

    @Column(nullable = false)
    private Integer user_id;

    @Column(length = 100, nullable = false)
    private String current_detailed_location;

    @Column(length = 100, nullable = false)
    private String current_district_location;

    @Column(length = 100, nullable = false)
    private String available_start_time;

    @Column(length = 100, nullable = false)
    private String available_end_time;

    @Column(nullable = false)
    private Integer rent_fee;

    @Column(length = 100, nullable = false)
    private Integer driving_fee;

    @Column(length = 100, nullable = false)
    private Integer battery;

    @Builder
    public Cars(String name, Integer service_enable, String return_location, Integer user_id, String current_detailed_location, String current_district_location, String available_start_time, String available_end_time, Integer rent_fee, Integer driving_fee, Integer battery) {
        this.name = name;
        this.service_enable = service_enable;
        this.return_location = return_location;
        this.user_id = user_id;
        this.current_detailed_location = current_detailed_location;
        this.current_district_location = current_district_location;
        this.available_start_time = available_start_time;
        this.available_end_time = available_end_time;
        this.rent_fee = rent_fee;
        this.driving_fee = driving_fee;
        this.battery = battery;
    }
}
