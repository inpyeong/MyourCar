package com.MyourCar.web;

import com.MyourCar.service.cars.CarsService;
import com.MyourCar.web.dto.CarsResponseDto;
import com.MyourCar.web.dto.CarsSaveRequestDto;
import org.springframework.web.bind.annotation.*;

@RestController
public class CarsController {
    private final CarsService carsService;

    public CarsController(CarsService carsService){
        this.carsService = carsService;
    }

    @PostMapping("/api/cars")
    public Long create(@RequestBody CarsSaveRequestDto carsSaveRequestDto){
        return carsService.savePost(carsSaveRequestDto);
    }
}
