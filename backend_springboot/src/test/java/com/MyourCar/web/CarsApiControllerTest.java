package com.MyourCar.web;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import lombok.Data;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@RunWith(SpringRunner.class)
//@WebMvcTest(controllers = UserApiController.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CarsApiControllerTest {

    @Autowired
    private CarsRepository carsRepository;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void findByIdTest() {
        // get
        Long id = 2L;
        String name = "이인평";
        String phoneNumber = "01033637093";
        String email = "jinipyung@gmail.com";
        Integer state = 0;
        String address = "서울시 강서구";
        Integer warning = 0;

//        usersRepository.save(Users.builder()
//                .id(5l)
//                .name(name)
//                .phoneNumber(phoneNumber)
//                .email(email)
//                .state(state)
//                .address(address)
//                .warning(warning)
//                .build());

        // when
//        List<Cars> carsList = carsRepository.findAll();
//
//        // then
//        Cars cars = carsList.get(0);
//        assertThat(cars.getId()).isEqualTo(id);
//        assertThat(cars.getName()).isEqualTo(name);
//        assertThat(cars.getPhoneNumber()).isEqualTo(phoneNumber);
//        assertThat(cars.getEmail()).isEqualTo(email);
//        assertThat(cars.getState()).isEqualTo(state);
//        assertThat(cars.getAddress()).isEqualTo(address);
//        assertThat(cars.getWarning()).isEqualTo(warning);

    }
    @Test
    public void testPostForObject_해더_포함해서_보내지_않기() {
        Cars newCars = Cars.builder()
                .id(2L)
                .name("이인평")
                .phoneNumber("01033637093")
                .email("jinipyung@gmail.com")
                .state(0)
                .address("서울시 강서구")
                .warning(0)
                .build();

        Cars car = restTemplate.postForObject("/post", newCars, Cars.class);
//        log.info("employee: {}", employee);
    }
}