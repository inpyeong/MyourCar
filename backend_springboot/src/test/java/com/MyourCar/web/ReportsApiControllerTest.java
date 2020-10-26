package com.MyourCar.web;

import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.domain.reports.ReportsRepository;
import com.MyourCar.domain.services.ServicesRepository;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.web.dto.ReportsSaveRequestDto;
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
public class ReportsApiControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private ReportsRepository reportsRepository;

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
    public void ReportsPost() throws Exception {
        ReportsSaveRequestDto reportsSaveRequestDto = ReportsSaveRequestDto.builder()
                .comment("잘 썼습니다.")
                .type(10)
                .build();

        String content = objectMapper.writeValueAsString(reportsSaveRequestDto);
        mvc.perform(post("/api/reports")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON));

        // then
//        Optional<Reviews> reviews1 = reviewsRepository.findById(4L);
//        assertThat(reviews1.get().getCars().getName()).isEqualTo("씹새끼");
    }
}