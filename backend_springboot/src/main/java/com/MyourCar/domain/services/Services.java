package com.MyourCar.domain.services;

import com.MyourCar.domain.BaseTimeEntity;
import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.reports.Reports;
import com.MyourCar.domain.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Services extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double callLocationLatitude;

    @Column(nullable = false)
    private Double callLocationLongitude;

    @Column(nullable = false)
    private Timestamp serviceStartTime;

    @Column(nullable = false)
    private Timestamp serviceEndTime;

    @Column(length = 100, nullable = false)
    private String parkingType;

    @ManyToOne(fetch = FetchType.LAZY)
    private Cars cars;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @OneToOne(mappedBy = "services")
    private Reports reports;

    @Builder
    public Services(Double callLocationLatitude, Double callLocationLongitude, Timestamp serviceStartTime,
                    Timestamp serviceEndTime, String parkingType,User user, Cars cars) {
        this.callLocationLatitude = callLocationLatitude;
        this.callLocationLongitude = callLocationLongitude;
        this.serviceStartTime = serviceStartTime;
        this.serviceEndTime = serviceEndTime;
        this.parkingType = parkingType;
        this.user = user;
        this.cars = cars;
    }
}
