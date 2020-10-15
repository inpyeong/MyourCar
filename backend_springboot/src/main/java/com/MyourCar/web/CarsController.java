package com.MyourCar.web;

import com.MyourCar.service.cars.CarsService;
import com.MyourCar.web.dto.CarsResponseDto;
import org.springframework.web.bind.annotation.*;

@RestController
public class CarsController {
    private final CarsService carsService;

    public CarsController(CarsService carsService){
        this.carsService = carsService;
    }

//    @RequestMapping("/users/{id}")
//    public CarsResponseDto findById(@PathVariable Long id) {
//        return carsService.findById(id);
//    }

    @PostMapping("/cars")
    public Long create(@RequestBody CarsResponseDto carsResponseDto){
        return carsService.savePost(carsResponseDto);
    }
}
