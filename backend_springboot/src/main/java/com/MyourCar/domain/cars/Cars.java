package com.MyourCar.domain.cars;

import com.MyourCar.domain.reviews.Reviews;
import com.MyourCar.domain.services.Services;
import com.MyourCar.domain.user.User;
import com.MyourCar.web.dto.ReviewsSaveRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
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

    @Column(length = 100, nullable = false)
    private String current_detailed_location;

    @Column(length = 100, nullable = false)
    private String current_district_location;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date available_start_time;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date available_end_time;

    @Column(nullable = false)
    private Integer rent_fee;

    @Column(length = 100, nullable = false)
    private Integer driving_fee;

    @Column(length = 100, nullable = false)
    private Integer battery;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "cars")
    private Set<Reviews> reviews = new HashSet<>();

    @OneToOne(mappedBy = "cars")
    private Services services;

    @Builder
    public Cars(String name, Integer service_enable, String return_location, String current_detailed_location,
                String current_district_location, Date available_start_time, Date available_end_time, Integer rent_fee,
                Integer driving_fee, Integer battery) {
        this.name = name;
        this.service_enable = service_enable;
        this.return_location = return_location;
        this.current_detailed_location = current_detailed_location;
        this.current_district_location = current_district_location;
        this.available_start_time = available_start_time;
        this.available_end_time = available_end_time;
        this.rent_fee = rent_fee;
        this.driving_fee = driving_fee;
        this.battery = battery;
    }
}
