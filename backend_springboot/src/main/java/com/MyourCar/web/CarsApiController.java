package com.MyourCar.web;

import com.MyourCar.service.cars.CarsService;
import com.MyourCar.web.dto.CarsResponseDto;
import com.MyourCar.web.dto.CarsSaveRequestDto;
import com.MyourCar.web.dto.CarsUpdateRequestDto;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class CarsApiController {
    private final CarsService carsService;

    public CarsApiController(CarsService carsService){
        this.carsService = carsService;
    }

    @PostMapping("/api/cars")
    public Long create(@RequestBody CarsSaveRequestDto carsSaveRequestDto){
        return carsService.save(carsSaveRequestDto);
    }

//    @PutMapping("/api/cars")
//    public Long update(@RequestBody CarsUpdateRequestDto requestDto) {
//        return carsService.updateServiceEnable(requestDto);
//    }

    @PatchMapping("/api/cars/{id}")
    public Map<String, Object> patch(@PathVariable("id") long id, @RequestBody CarsUpdateRequestDto carsUpdateRequestDto) {
        Map<String, Object> response = new HashMap<>();

        if(carsService.patch(id, carsUpdateRequestDto) > 0) {
            response.put("result", "SUCCESS");
        } else {
            response.put("result", "FAIL");
            response.put("reason", "일치하는 회원 정보가 없습니다. 사용자 id를 확인해주세요.");
        }

        return response;
    }
}
