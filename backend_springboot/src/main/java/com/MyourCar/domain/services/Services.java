package com.MyourCar.domain.services;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.reports.Reports;
import com.MyourCar.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Services {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String call_location;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date service_start_time;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date service_end_time;

    @Column(length = 100, nullable = false)
    private String parking_type;

    @OneToOne
    private Cars cars;

    @OneToOne
    private User user;

    @OneToOne(mappedBy = "services")
    private Reports reports;

    @Builder
    public Services(String call_location, Date service_start_time, Date service_end_time, String parking_type) {
        this.call_location = call_location;
        this.service_start_time = service_start_time;
        this.service_end_time = service_end_time;
        this.parking_type = parking_type;
    }
}
