package com.MyourCar.domain.cars;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface CarsRepository extends JpaRepository<Cars, Long> {
}
