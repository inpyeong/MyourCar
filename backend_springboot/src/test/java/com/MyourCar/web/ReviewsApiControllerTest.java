package com.MyourCar.web;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.domain.reviews.Reviews;
import com.MyourCar.domain.reviews.ReviewsRepository;
import com.MyourCar.domain.user.User;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.web.dto.CarsSaveRequestDto;
import com.MyourCar.web.dto.CarsUpdateRequestDto;
import com.MyourCar.web.dto.ReviewsListResponseDto;
import com.MyourCar.web.dto.ReviewsSaveRequestDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ReviewsApiControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private ReviewsRepository reviewsRepository;

    @Autowired
    private CarsRepository carsRepository;

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
    public void 리뷰_생성하기() throws Exception {
        // Given
        ReviewsSaveRequestDto reviewsSaveRequestDto = ReviewsSaveRequestDto.builder()
                .score(5)
                .comment("차가 좋아요")
                .build();

        // When
        String content = objectMapper.writeValueAsString(reviewsSaveRequestDto);
        mvc.perform(post("/api/reviews/1")
                .header(HttpHeaders.AUTHORIZATION, "Bearer token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjA1MzcxOTUwLCJleHAiOjE2MDYyMzU5NTB9._h5E9sy-QCaV5TYfbRq17-TKEj8EpfrZx5CczwTOzxwZguI8ws6yB6czcuPvBDf4vQSZiW-K5LurzbHyFZkaGQ")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        List<Reviews> reviewsList = reviewsRepository.findByCommentContains("차가 좋아요");

        // Then
        assertThat(reviewsList.size()).isEqualTo(1);
    }

    @Test
    @WithMockUser(roles="USER")
    public void 리뷰_조회하기() throws Exception {
        // Given
        Long reviewId = 6l;

        // When
        MvcResult mvcResult = mvc.perform(get("/api/reviews/" + reviewId)
                .header(HttpHeaders.AUTHORIZATION, "Bearer token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjA1MzcxOTUwLCJleHAiOjE2MDYyMzU5NTB9._h5E9sy-QCaV5TYfbRq17-TKEj8EpfrZx5CczwTOzxwZguI8ws6yB6czcuPvBDf4vQSZiW-K5LurzbHyFZkaGQ"))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = mvcResult.getResponse().getContentAsString();
        Reviews reviews = objectMapper.readValue(contentAsString, Reviews.class);

        // Then
        assertThat(reviews.getId()).isEqualTo(6l);

    }

    @Test
    @WithMockUser(roles="USER")
    public void 리뷰_조회하기_페이징() throws Exception {
        // Given
        Long carId = 1l;
        Integer page = 0, size = 3;

        // When, Then
        mvc.perform(get("/api/reviews")
                .param("carId", String.valueOf(carId))
                .param("page", String.valueOf(page))
                .param("size", String.valueOf(size))
                .header(HttpHeaders.AUTHORIZATION, "Bearer token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjA1MzcxOTUwLCJleHAiOjE2MDYyMzU5NTB9._h5E9sy-QCaV5TYfbRq17-TKEj8EpfrZx5CczwTOzxwZguI8ws6yB6czcuPvBDf4vQSZiW-K5LurzbHyFZkaGQ"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].score").value(5));
    }

    @Test
    @WithMockUser(roles="USER")
    public void 리뷰_삭제하기() throws Exception {
        // Given
        Long reviewId = 3l;

        // When
        mvc.perform(delete("/api/reviews/" + reviewId)
                .header(HttpHeaders.AUTHORIZATION, "Bearer token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjA1MzcxOTUwLCJleHAiOjE2MDYyMzU5NTB9._h5E9sy-QCaV5TYfbRq17-TKEj8EpfrZx5CczwTOzxwZguI8ws6yB6czcuPvBDf4vQSZiW-K5LurzbHyFZkaGQ"))
                .andExpect(status().isOk());
        Optional<Reviews> optionalReviews = reviewsRepository.findById(reviewId);

        // Then
        assertThat(optionalReviews.isPresent()).isFalse();
    }
}