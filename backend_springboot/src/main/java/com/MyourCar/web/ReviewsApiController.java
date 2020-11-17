package com.MyourCar.web;

import com.MyourCar.domain.reviews.Reviews;
import com.MyourCar.service.cars.CarsService;
import com.MyourCar.service.reviews.ReviewsService;
import com.MyourCar.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class ReviewsApiController {
    private final ReviewsService reviewsService;

    @PostMapping("/api/reviews/{carId}")
    public Long save(@PathVariable Long carId, @RequestBody ReviewsSaveRequestDto reviewsSaveRequestDto){
        return reviewsService.save(carId, reviewsSaveRequestDto);
    }

    @GetMapping("/api/reviews")
    public Page<ReviewsListResponseDto> findByCars(@RequestParam Long carId, @RequestParam Integer page, @RequestParam Integer size) {
        return reviewsService.findByCars(carId, page, size);
    }

    @GetMapping("api/review/{id}")
    public ReviewsResponseDto findById(@PathVariable Long id) {
        return reviewsService.findById(id);
    }

    @PatchMapping("/api/reviews/{id}")
    public Long update(@PathVariable Long id, @RequestBody ReviewsUpdateRequestDto requestDto) {
        return reviewsService.update(id, requestDto);
    }

    @DeleteMapping("/api/reviews/{id}")
    public Long delete(@PathVariable Long id) {
        reviewsService.delete(id);
        return id;
    }

}
