package com.MyourCar.domain.reviews;

import com.MyourCar.domain.cars.Cars;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewsRepository extends JpaRepository<Reviews, Long> {

    List<Reviews> findByCommentContains(String comment);

    Page<Reviews> findByCars(Cars cars, Pageable pageable);
}
