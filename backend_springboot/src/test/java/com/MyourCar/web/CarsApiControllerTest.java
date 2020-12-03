package com.MyourCar.web;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.domain.services.Services;
import com.MyourCar.domain.services.ServicesRepository;
import com.MyourCar.domain.user.AuthProvider;
import com.MyourCar.domain.user.User;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.security.UserPrincipal;
import com.MyourCar.web.dto.CarsSaveRequestDto;
import com.MyourCar.web.dto.CarsUpdateRequestDto;
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
import org.springframework.http.*;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.transaction.Transactional;
import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.useRepresentation;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
    private ServicesRepository servicesRepository;

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
    @WithMockUser(roles="USER")
    public void 차량_정보_생성() throws Exception {
        // Given
        CarsSaveRequestDto requestDto = CarsSaveRequestDto.builder()
                .name("볼보")
                .licensePlateNumber("12가 1234")
                .build();

        Optional<User> user = userRepository.findById(1l);
        UserPrincipal userPrincipal = UserPrincipal.create(user.get());

        // When
        String content = objectMapper.writeValueAsString(requestDto);
        mvc.perform(post("/api/cars")
                .with(user(userPrincipal))
                .header(HttpHeaders.AUTHORIZATION, "Bearer token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjA1MzcxOTUwLCJleHAiOjE2MDYyMzU5NTB9._h5E9sy-QCaV5TYfbRq17-TKEj8EpfrZx5CczwTOzxwZguI8ws6yB6czcuPvBDf4vQSZiW-K5LurzbHyFZkaGQ")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Then
        Optional<Cars> optionalCars = carsRepository.findByName("볼보");
        assertThat(optionalCars.isPresent()).isTrue();
        assertThat(optionalCars.get().getUser().getId()).isEqualTo(1l);
    }

    @Test
    @WithMockUser(roles="USER")
    public void 예약차량_조회() throws Exception {
        // Given
        Optional<User> user = userRepository.findById(1l);
        UserPrincipal userPrincipal = UserPrincipal.create(user.get());

        // When
        mvc.perform(get("/api/cars/reserved")
                .param("userId", String.valueOf(1L))
                .with(user(userPrincipal))
                .header(HttpHeaders.AUTHORIZATION, "Bearer token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjA2NzY3NTcyLCJleHAiOjE2MDc2MzE1NzJ9.zPeVr8hd_6PXVtAdZmytZqfx7SA3lBp-84vpmCnbw4SybmC1MMNf5Jv2NWngmvj1Wws2mhyIeylWoVuX2dAFiA"))
                .andDo(print())
                .andExpect(status().isOk());

    }

//    @Test
//    @WithMockUser(roles="GUEST")
//    public void testPostForObject_해더_포함해서_보내지_않기() throws Exception {
//        // given
//        CarsSaveRequestDto carsSaveRequestDto = CarsSaveRequestDto.builder()
//                .name("쏘나타")
//                .service_enable(0)
//                .return_location("서울시 성북구 정릉동")
//                .current_detailed_location("명지동")
//                .current_district_location("부산시 강서구")
//                .available_start_time(new Date(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
//                        .parse("2020-10-20 22:00:00").getTime()))
//                .available_end_time(new Date(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
//                        .parse("2020-10-20 22:00:00").getTime()))
//                .rent_fee(20000)
//                .driving_fee(5000)
//                .battery(85)
//                .build();
//
//        String content = objectMapper.writeValueAsString(carsSaveRequestDto);

//        String url = "http://localhost:" + port + "/api/cars";
//        mvc.perform(post("/api/cars")
//                .content(content)
//                .contentType(MediaType.APPLICATION_JSON));
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
//    }

    @Test
    @WithMockUser(roles="USER")
    public void carsUpdate() throws Exception {
        // get

//        CarsUpdateRequestDto carsUpdateRequestDto = CarsUpdateRequestDto.builder()
//                .return_location("서울시 성북구 정릉동")
//                .available_start_time_str(new Date(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
//                        .parse("2020-10-21 22:00:00").getTime()))
//                .available_end_time_str(new Date(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
//                        .parse("2020-10-22 22:00:00").getTime()))
//                .rent_fee(200)
//                .driving_fee(18)
//                .build();
//
//        String content = objectMapper.writeValueAsString(carsUpdateRequestDto);
//        mvc.perform(patch("/api/cars/{id}", 1)
//                .content(content)
//                .contentType(MediaType.APPLICATION_JSON)
//                .accept(MediaType.APPLICATION_JSON))
//                .andDo(print());
//
//        mvc.perform(get("/user/me"))
//                .andDo(print());
    }

    @Test
    @WithMockUser(roles="USER")
    public void findByCallCoordsAndCallServiceTime() throws Exception {
        // Given

        mvc.perform(get("/api/cars/recommend?coords=35.123123,125.123123&serviceTime=2020-11-11,11,30,오늘,13,30"))
                .andDo(print());

    }

}