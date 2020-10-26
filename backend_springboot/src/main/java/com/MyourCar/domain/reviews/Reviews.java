package com.MyourCar.domain.reviews;

import com.MyourCar.domain.cars.Cars;
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
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer score;

    @Column(length = 20, nullable = false)
    private String comment;

    @ManyToOne
    private Cars cars;

    @Builder
    public Reviews(Integer score, String comment) {
        this.score = score;
        this.comment = comment;
    }
}
