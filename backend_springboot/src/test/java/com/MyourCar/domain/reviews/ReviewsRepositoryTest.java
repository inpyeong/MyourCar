package com.MyourCar.domain.reviews;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@Transactional(Transactional.TxType.REQUIRES_NEW)
@Rollback(value = false)
@SpringBootTest
public class ReviewsRepositoryTest {

    @Autowired
    ReviewsRepository reviewsRepository;

    @Autowired
    CarsRepository carsRepository;

    @Test
    public void 리뷰_생성() {
        // Given
        Optional<Cars> optionalCars = carsRepository.findByName("K5");
        Reviews reviews = Reviews.builder()
                .score(5)
                .comment("겉보기에도 튼튼합니다.")
                .cars(optionalCars.get())
                .build();
        reviewsRepository.save(reviews);

        // When
        List<Reviews> reviewsList = reviewsRepository.findByCommentContains("겉보기");

        // Then
        assertThat(reviewsList.size()).isEqualTo(4);
        assertThat(reviewsList.get(0).getCars().getName()).isEqualTo("K5");

    }

    @Test
    public void 리뷰_조회() {
        // Given

        // When
        List<Reviews> reviewsList = reviewsRepository.findAll();

        // Then
        assertThat(reviewsList.size()).isNotEqualTo(0);
    }

    @Test
    public void 리뷰_조회_페이징() {
        // Given
        Integer page = 0, size = 6;
        String sortColumn = "createdDate";
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, sortColumn));

        Long carId = 1l;
        Optional<Cars> optionalCars = carsRepository.findById(carId);

        // When
        Page<Reviews> reviewsPage = reviewsRepository.findByCars(optionalCars.get(), pageRequest);

        // Then
        assertThat(reviewsPage.getNumberOfElements()).isEqualTo(6);

    }

    @Test
    public void 리뷰_수정() {
//        // Given
//        Long reviewId = 1L;
//
//        // When
//        Optional<Reviews> optionalReviews = reviewsRepository.findById(reviewId);
//
//        // Then
//        assertThat(optionalReviews.isPresent()).isTrue();
//
//        // When
//        optionalReviews.get().update(3, "트럭이랑 박으면 죽습니다.");
//
//        // Then
//        assertThat(optionalReviews.get().getScore()).isEqualTo(3);
//        assertThat(optionalReviews.get().getComment()).contains("죽습니다.");
    }

    @Test
    public void 리뷰_삭제() {
        // Given
        Long reviewId = 3l;

        // When
        Optional<Reviews> optionalReviews = reviewsRepository.findById(reviewId);

        // Then
        assertThat(optionalReviews.isPresent()).isTrue();

        // When
        reviewsRepository.delete(optionalReviews.get());
        optionalReviews = reviewsRepository.findById(reviewId);

        // Then
        assertThat(optionalReviews.isPresent()).isFalse();

    }
}