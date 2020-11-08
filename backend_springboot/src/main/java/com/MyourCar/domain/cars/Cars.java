package com.MyourCar.domain.cars;

import com.MyourCar.domain.reviews.Reviews;
import com.MyourCar.domain.services.Services;
import com.MyourCar.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
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
    @Temporal(TemporalType.TIMESTAMP)
    private Date availableStartTime;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date availableEndTime;

    @Column
    private Integer rentFee;

    @Column(length = 100)
    private Integer drivingFee;

    @Column(length = 100)
    private Integer battery;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @OneToMany(mappedBy = "cars", fetch = FetchType.EAGER)
    private Set<Reviews> reviews = new HashSet<>();

    @OneToMany(mappedBy = "cars")
    private Set<Services> services = new HashSet<>();

}
