package com.MyourCar.domain.cars;

import com.MyourCar.domain.services.Services;
import com.MyourCar.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface CarsRepository extends JpaRepository<Cars, Long> {

    List<Cars> findByAvailableStartTimeLessThanAndAvailableEndTimeGreaterThan(Timestamp start, Timestamp end);

    Optional<Cars> findByName(String name);

//    @Query(value = "SELECT c FROM Cars c LEFT JOIN FETCH c.reviews")
    List<Cars> findByUser(User user);

    @Query(value = "SELECT *, (6371*acos(cos(radians(:callLatitude))*cos(radians(current_location_latitude))*cos(radians(current_location_longitude) -radians(:callLongitude))+sin(radians(:callLatitude))*sin(radians(current_location_latitude)))) AS distance FROM cars WHERE cars.available_start_time < :callStartTime AND cars.available_end_time > :callEndTime HAVING distance <= 1 ORDER BY distance", nativeQuery = true)
    List<Cars> findByCallCoordsAndCallServiceTime(@Param("callLatitude") Double callLatitude, @Param("callLongitude") Double callLongitude, @Param("callStartTime") String callStartTime, @Param("callEndTime") String callEndTime);

    List<Cars> findAllByServicesIn(List<Services> servicesList);

}
