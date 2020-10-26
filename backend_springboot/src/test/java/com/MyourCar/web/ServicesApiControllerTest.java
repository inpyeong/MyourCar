package com.MyourCar.web;

import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.domain.reviews.ReviewsRepository;
import com.MyourCar.domain.services.ServicesRepository;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.web.dto.ReviewsSaveRequestDto;
import com.MyourCar.web.dto.ServicesSaveRequestDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.transaction.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ServicesApiControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private ServicesRepository servicesRepository;

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
    @Transactional
    @WithMockUser(roles="GUEST")
    public void ServicePost() throws Exception {
        ServicesSaveRequestDto servicesSaveRequestDto = ServicesSaveRequestDto.builder()
                .call_location("서울시 강서구")
                .service_start_time(new Date(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                        .parse("2020-10-20 22:00:00").getTime()))
                .service_end_time(new Date(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                        .parse("2020-10-20 22:00:00").getTime()))
                .parking_type("지하 주차장")
                .build();

        String content = objectMapper.writeValueAsString(servicesSaveRequestDto);
        mvc.perform(post("/api/services")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON));

        // then
//        Optional<Reviews> reviews1 = reviewsRepository.findById(4L);
//        assertThat(reviews1.get().getCars().getName()).isEqualTo("씹새끼");
    }
}