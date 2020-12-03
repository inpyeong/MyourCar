package com.MyourCar.service.reviews;


import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.domain.reviews.Reviews;
import com.MyourCar.domain.reviews.ReviewsRepository;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Converter;
import java.lang.annotation.Annotation;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewsService {
    private final ReviewsRepository reviewsRepository;
    private final CarsRepository carsRepository;

    public ReviewsListResponseDto convertToDto(Reviews reviews) {
        return new ReviewsListResponseDto((reviews));
    }

    @Transactional
    public Long save(Long carId, ReviewsSaveRequestDto reviewsSaveRequestDto) {
        Cars cars = carsRepository.getOne(carId);

        return reviewsRepository.save(reviewsSaveRequestDto.toEntity(cars)).getId();
    }

    @Transactional(readOnly = true)
    public ReviewsResponseDto findById(Long id) {
        Reviews entity = reviewsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 리뷰가 없습니다. id:" + id));

        return new ReviewsResponseDto(entity);
    }

    @Transactional(readOnly = true)
    public Page<ReviewsListResponseDto> findByCars(Long carId, Integer page, Integer size) {

        Cars cars = carsRepository.getOne(carId);

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));

        return reviewsRepository.findByCars(cars, pageRequest).map(this::convertToDto);
    }

    @Transactional
    public Long update(Long id, ReviewsUpdateRequestDto requestDto) {
        Reviews reviews = reviewsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 리뷰가 없습니다. id:" + id));

        reviews.update(requestDto.getScore(), requestDto.getComment(), requestDto.getImage());

        return id;
    }

    @Transactional
    public void delete(Long id) {
        Reviews reviews = reviewsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 리뷰가 없습니다. id:" + id));

        reviewsRepository.delete(reviews);
    }


}
