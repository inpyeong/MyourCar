package com.MyourCar.web;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.domain.user.Role;
import com.MyourCar.domain.user.User;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.web.dto.CarsSaveRequestDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CarsApiControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private CarsRepository carsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Before
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    @WithMockUser(roles="GUEST")
    public void testPostForObject_해더_포함해서_보내지_않기() throws Exception {
        // given
        CarsSaveRequestDto carsSaveRequestDto = CarsSaveRequestDto.builder()
                .name("이태훈")
                .service_enable(0)
                .return_location("서울시 성북구 정릉동")
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

        String content = objectMapper.writeValueAsString(carsSaveRequestDto);

//        String url = "http://localhost:" + port + "/api/cars";
        mvc.perform(post("/api/cars")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON));
//        carsRepository.save(carsSaveRequestDto);
//        carsRepository.save(carsSaveRequestDto);


        // when
//        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, carsSaveRequestDto, Long.class);
//
//        // then
//        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
//        assertThat(responseEntity.getBody()).isGreaterThan(0L);

//        List<Cars> all = carsRepository.findAll();
//        assertThat(all.get(0).getName()).isEqualTo("이태훈");
    }

    @Test
    public void carsAndUserRelation() throws ParseException {
        // get
        User user = User.builder()
                .name("이인평")
                .phoneNumber("01033637093")
                .email("jinipyung@gmail.com")
                .state(0)
                .address("서울시 강서구")
                .warning(0)
                .role(Role.GUEST)
                .build();

        Cars car = Cars.builder()
                .name("이태훈")
                .service_enable(0)
                .return_location("서울시 성북구 정릉동")
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

        // when
        user.getCars().add(car);
        car.setUser(user);

        userRepository.save(user);
        carsRepository.save(car);

        // then
        Optional<Cars> cars = carsRepository.findById(1L);
        assertThat(cars.get().getUser().getName()).isEqualTo("이인평");
    }
    @Test
    public void carsUpdate() throws ParseException {
        // get

        Cars car = Cars.builder()
                .name("이태훈")
                .service_enable(0)
                .return_location("서울시 성북구 정릉동")
                .current_detailed_location("명지동")
                .current_district_location("부산시 강서구")
                .available_start_time(new Date(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                        .parse("2020-10-25 22:00:00").getTime()))
                .available_end_time(new Date(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                        .parse("2020-10-27 22:00:00").getTime()))
                .rent_fee(200)
                .driving_fee(50)
                .battery(85)
                .build();

        String url = "http://localhost:" + port + "/api/cars/{id}";
        Map<String, Integer> params = new HashMap<>();
        params.put("id", 1);
        // when
        restTemplate.put(url, car, params);
    }
}