package com.MyourCar.domain.reports;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.services.Services;
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
public class Reports {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 225, nullable = false)
    private String comment;

    @Column(nullable = false)
    private Integer type;

    @ManyToOne
    private Services services;

    @Builder
    public Reports(String comment, Integer type){
        this.comment = comment;
        this.type = type;
    }
}
