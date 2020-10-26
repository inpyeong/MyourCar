package com.MyourCar.web;

import com.MyourCar.domain.reviews.Reviews;
import com.MyourCar.service.cars.CarsService;
import com.MyourCar.service.reviews.ReviewsService;
import com.MyourCar.web.dto.CarsSaveRequestDto;
import com.MyourCar.web.dto.CarsUpdateRequestDto;
import com.MyourCar.web.dto.ReviewsSaveRequestDto;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ReviewsApiController {
    private final ReviewsService reviewsService;

    public ReviewsApiController(ReviewsService reviewsService){
        this.reviewsService = reviewsService;
    }

    @PostMapping("/api/reviews")
    public Long create(@RequestBody ReviewsSaveRequestDto reviewsSaveRequestDto){
        return reviewsService.save(reviewsSaveRequestDto);
    }


//    @PutMapping("/api/reviews")
//    public Long update(@RequestBody CarsUpdateRequestDto requestDto) {
//        return reviewsService.updateServiceEnable(requestDto);
//    }

//    @PatchMapping("/api/reviews/{id}")
//    public Map<String, Object> patch(@PathVariable("id") long id, @RequestBody CarsUpdateRequestDto carsUpdateRequestDto) {
//        Map<String, Object> response = new HashMap<>();
//
//        if(carsService.patch(id, carsUpdateRequestDto) > 0) {
//            response.put("result", "SUCCESS");
//        } else {
//            response.put("result", "FAIL");
//            response.put("reason", "일치하는 회원 정보가 없습니다. 사용자 id를 확인해주세요.");
//        }
//
//        return response;
//    }
}
