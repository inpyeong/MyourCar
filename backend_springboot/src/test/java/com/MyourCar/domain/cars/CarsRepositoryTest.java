package com.MyourCar.domain.cars;

import com.MyourCar.domain.user.AuthProvider;
import com.MyourCar.domain.user.User;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.util.TimeUtils;
import com.MyourCar.domain.reviews.Reviews;
import com.MyourCar.domain.reviews.ReviewsRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CarsRepositoryTest {

    @Autowired
    CarsRepository carsRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ReviewsRepository reviewsRepository;

    @Test
    public void checkFloatColumn() {
        // Given
        Cars car = new Cars();
        car.setName("포르쉐");
        car.setServiceEnable(1);
        car.setCurrentLocationLatitude(35.123123);
        car.setCurrentLocationLongitude(125.123123);
        carsRepository.save(car);

        // When
        Optional<Cars> byId = carsRepository.findById(1l);

        // Then
        assertThat(byId.get().getCurrentLocationLatitude()).isEqualTo(35.123123);

    }

    @Test
    public void checkDoublePrecisionColumn() {
        // Given
        Cars car = new Cars();
        car.setName("포르쉐");
        car.setServiceEnable(1);
        car.setCurrentLocationLatitude(35.123123);
        car.setCurrentLocationLongitude(125.123123);

        carsRepository.save(car);

        // When
        Optional<Cars> byId = carsRepository.findById(1l);

        // Then
        assertThat(byId.get().getCurrentLocationLatitude()).isEqualTo(35.123123);
    }

    @Test
    public void checkDateTimeColumn() {
        // Given
        Cars car = new Cars(); car.setName("포르쉐");
        car.setServiceEnable(1);
        car.setAvailableStartTime(TimeUtils.parseTimestamp("2020-05-01 12:00:00"));
        car.setAvailableEndTime(TimeUtils.parseTimestamp("2020-05-01 12:50:00"));
        carsRepository.save(car);

        Cars _car = new Cars(); _car.setName("테라칸");
        _car.setServiceEnable(1);
        _car.setAvailableStartTime(TimeUtils.parseTimestamp("2020-05-01 12:00:00"));
        _car.setAvailableEndTime(TimeUtils.parseTimestamp("2020-05-01 13:10:00"));
        carsRepository.save(_car);

        Timestamp start = TimeUtils.parseTimestamp("2020-05-01 12:30:00");
        Timestamp end = TimeUtils.parseTimestamp("2020-05-01 13:00:00");

        // When
        List<Cars> carsList = carsRepository.findByAvailableStartTimeLessThanAndAvailableEndTimeGreaterThan(start, end);

        // Then
        assertThat(carsList.size()).isEqualTo(1);
        assertThat(carsList.get(0).getName()).isEqualTo("테라칸");
    }

    @Test
    public void 추천부름차량_가져오기() {
        // Given
//        Cars car = new Cars(); car.setName("포르쉐");
//        car.setServiceEnable(1);
//        car.setCurrentLocationLatitude(37.551459);
//        car.setCurrentLocationLongitude(126.866865);
//        car.setAvailableStartTime(TimeUtils.parseTimestamp("2020-05-01 12:00:00"));
//        car.setAvailableEndTime(TimeUtils.parseTimestamp("2020-05-01 13:10:00"));
//        carsRepository.save(car);
//
//        Cars _car = new Cars(); _car.setName("테라칸");
//        _car.setServiceEnable(1);
//        _car.setCurrentLocationLatitude(37.610890);
//        _car.setCurrentLocationLongitude(126.996575);
//        _car.setAvailableStartTime(TimeUtils.parseTimestamp("2020-05-01 12:00:00"));
//        _car.setAvailableEndTime(TimeUtils.parseTimestamp("2020-05-01 12:50:00"));
//        carsRepository.save(_car);

        // When
//        List<Cars> cars = entityManager.createNativeQuery(
//                "SELECT " +
//                        "*, " +
//                        "(6371*acos(cos(radians(:callLatitude))*cos(radians(current_location_latitude))*cos(radians(current_location_longitude) -radians(:callLongitude))+sin(radians(:callLatitude))*sin(radians(current_location_latitude)))) AS distance " +
//                        "FROM cars " +
//                        "WHERE cars.available_start_time < :callStartTime AND cars.available_end_time > :callEndTime " +
//                        "HAVING distance <= 1 " +
//                        "ORDER BY distance "
//                , Cars.class)
//                .setParameter("callLatitude", 37.549599)
//                .setParameter("callLongitude", 126.868277)
//                .setParameter("callStartTime", TimeUtils.parseTimestamp("2020-05-01 12:30:00"))
//                .setParameter("callEndTime", TimeUtils.parseTimestamp("2020-05-01 13:00:00"))
//                .getResultList();
        List<Cars> byCallCoordsAndCallServiceTime = carsRepository.findByCallCoordsAndCallServiceTime(37.608553,127.005501, TimeUtils.parseTimestamp("2020-11-13 14:30:00"), TimeUtils.parseTimestamp("2020-11-13 15:00:00"));

        // Then
        assertThat(byCallCoordsAndCallServiceTime.size()).isEqualTo(2);
//        assertThat(byCallCoordsAndCallServiceTime.get(0).getName()).isEqualTo("포르쉐");
    }

    @Test
    public void 유저로_차량_검색() {
        // Given
        Cars car = new Cars();
        car.setName("포르");
        car.setServiceEnable(1);

        User user = new User();
        user.setId(1l);
        user.setProvider(AuthProvider.local);
        user.setName("인평");
        user.setEmail("jinipyung@naver.com");
        user.setPhoneNumber("01000000000");
        user.setState(0);
        user.setWarning(0);

        car.setUser(user);
        carsRepository.save(car);
        User save = userRepository.save(user);

        // When
        List<Cars> byUser = carsRepository.findByUser(save);

        // Then
        assertThat(byUser.size()).isEqualTo(1);
        assertThat(byUser.get(0).getName()).isEqualTo("포르");
    }

}