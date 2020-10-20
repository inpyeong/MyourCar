package com.MyourCar.web;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.web.dto.CarsSaveRequestDto;
import lombok.Data;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.boot.test.web.client.TestRestTemplate;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CarsApiControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private CarsRepository carsRepository;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testPostForObject_해더_포함해서_보내지_않기() throws ParseException {
        // given
        CarsSaveRequestDto carsSaveRequestDto = CarsSaveRequestDto.builder()
                .name("이태훈")
                .service_enable(0)
                .return_location("서울시 성북구 정릉동")
                .user_id(2)
                .current_detailed_location("명지동")
                .current_district_location("부산시 강서구")
                .available_start_time(new Date(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                        .parse("2020-10-20 22:00:00").getTime()))
                .available_end_time(new Date(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                        .parse("2020-10-20 22:00:00").getTime()))
                .rent_fee(20000)
                .driving_fee(5000)
                .battery(85)
                .build();
        String url = "http://localhost:" + port + "/api/cars";

        // when
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, carsSaveRequestDto, Long.class);

        // then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);

        List<Cars> all = carsRepository.findAll();
        assertThat(all.get(0).getName()).isEqualTo("이태훈");
    }
}