package com.MyourCar.domain.services;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.domain.user.User;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.web.dto.CarsResponseDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ServicesRepositoryTest {

    @Autowired ServicesRepository servicesRepository;

    @Autowired CarsRepository carsRepository;

    @Autowired
    UserRepository userRepository;

    @Test
    public void 차량으로_서비스_검색() {
        // Given
        Cars firstCar = new Cars();
        firstCar.setLicensePlateNumber("12가-1010");
        firstCar.setServiceEnable(0);
        firstCar.setName("코란도");

        Cars secondCar = new Cars();
        secondCar.setLicensePlateNumber("12가-1011");
        secondCar.setServiceEnable(0);
        secondCar.setName("코란도스포츠");

        Services services = new Services();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        services.setCallLocationLatitude(35.123123);
        services.setCallLocationLongitude(125.123123);
        services.setParkingType("아파트 주차장");
        services.setServiceEndTime(timestamp);
        services.setServiceStartTime(timestamp);

//        carsRepository.saveAll(Arrays.asList(firstCar, secondCar));
//        services.setCars(firstCar);
//        servicesRepository.save(services);

        Cars one = carsRepository.getOne(16l);
        Cars two = carsRepository.getOne(17l);

        // When
        List<Services> allByCars = servicesRepository.findAllByCarsIn(Arrays.asList(one, two));

        // Then
        assertThat(allByCars.size()).isEqualTo(1);

    }

    @Test
    public void 유저로_서비스_검색() {
        // Given
        User one = userRepository.getOne(1l);

        // When
        Optional<Services> byUserId = servicesRepository.findByUser(one);

        // Then
        assertThat(byUserId.isPresent());

    }
}