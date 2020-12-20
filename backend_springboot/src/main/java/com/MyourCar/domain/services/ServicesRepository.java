package com.MyourCar.domain.services;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ServicesRepository extends JpaRepository<Services, Long> {

    Optional<Services> findFirstByUserOrderByCreatedDateDesc(User user);

    Optional<Services> findFirstByCarsOrderByCreatedDateDesc(Cars cars);

    List<Services> findAllByCarsIn(List<Cars> carsList);

    Optional<Services> findByUser(User user);
}
