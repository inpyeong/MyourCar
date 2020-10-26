package com.MyourCar.web;

import com.MyourCar.service.reviews.ReviewsService;
import com.MyourCar.service.services.ServicesService;
import com.MyourCar.web.dto.ReviewsSaveRequestDto;
import com.MyourCar.web.dto.ServicesSaveRequestDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServicesApiController {
    private final ServicesService servicesService;

    public ServicesApiController(ServicesService servicesService){
        this.servicesService = servicesService;
    }

    @PostMapping("/api/services")
    public Long create(@RequestBody ServicesSaveRequestDto servicesSaveRequestDto){

        return servicesService.save(servicesSaveRequestDto);
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
