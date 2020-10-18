package com.MyourCar.web;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.web.dto.CarsResponseDto;
import com.MyourCar.web.dto.CarsSaveRequestDto;
import lombok.Data;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @LocalServerPort
    private int port;

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
        // given
        CarsSaveRequestDto carsSaveRequestDto = CarsSaveRequestDto.builder()
                .name("이태훈")
                .service_enable(0)
                .return_location("서울시 성북구 정릉동")
                .user_id(2)
                .current_detailed_location("명지동")
                .current_district_location("부산시 강서구")
                .available_start_time("월~금/10:00")
                .available_end_time("월~금/18:00")
                .rent_fee(20000)
                .driving_fee(5000)
                .battery(85)
                .build();
        String url = "http://localhost:" + port + "/cars";

        // when
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, carsSaveRequestDto, Long.class);

        // then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);

        List<Cars> all = carsRepository.findAll();
        assertThat(all.get(0).getName()).isEqualTo("이태훈");
    }
}