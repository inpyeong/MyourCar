package com.MyourCar.domain.cars;

import com.MyourCar.domain.reviews.Reviews;
import com.MyourCar.domain.services.Services;
import com.MyourCar.domain.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = "licensePlateNumber")
})
@NoArgsConstructor
@Entity
public class Cars {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20, nullable = false)
    private String name;

    @Column
    private String licensePlateNumber;

    @Column(nullable = false)
    private Integer serviceEnable;

    @Column
    private Double returnLocationLatitude;

    @Column
    private Double returnLocationLongitude;

    @Column
    private Double currentLocationLatitude;

    @Column
    private Double currentLocationLongitude;

    @Column
    private Timestamp availableStartTime;

    @Column
    private Timestamp availableEndTime;

    @Column
    private Integer rentFee;

    @Column(length = 100)
    private Integer drivingFee;

    @Column(length = 100)
    private Integer battery;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "cars")
    private Set<Reviews> reviews = new HashSet<>();

    @OneToMany(mappedBy = "cars")
    private Set<Services> services = new HashSet<>();

    @Builder
    public Cars(String name, String licensePlateNumber, User user) {
        this.name = name;
        this.licensePlateNumber = licensePlateNumber;
        this.serviceEnable = 0;
        this.user = user;
    }

    public void update(Integer serviceEnable, Double currentLocationLatitude, Double currentLocationLongitude,
                       Double returnLocationLatitude, Double returnLocationLongitude, Timestamp availableStartTime,
                       Timestamp availableEndTime, Integer rentFee, Integer drivingFee, Integer battery) {
        this.serviceEnable = serviceEnable;
        this.currentLocationLatitude = currentLocationLatitude;
        this.currentLocationLongitude = currentLocationLongitude;
        this.returnLocationLatitude = returnLocationLatitude;
        this.returnLocationLongitude = returnLocationLongitude;
        this.availableStartTime = availableStartTime;
        this.availableEndTime = availableEndTime;
        this.rentFee = rentFee;
        this.drivingFee = drivingFee;
        this.battery = battery;
    }

}
