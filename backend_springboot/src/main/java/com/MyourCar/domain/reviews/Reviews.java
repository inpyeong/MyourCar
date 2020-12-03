package com.MyourCar.domain.reviews;

import com.MyourCar.domain.BaseTimeEntity;
import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.user.User;
import com.MyourCar.web.dto.ReviewsListResponseDto;
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
public class Reviews extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer score;

    @Column
    private String comment;

    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    private Cars cars;

    public void update(Integer score, String comment, String image) {
        this.score = score;
        this.comment = comment;
        this.image = image;
    }

    @Builder
    public Reviews(Integer score, String comment, Cars cars) {
        this.score = score;
        this.comment = comment;
        this.cars = cars;
    }
}
