package com.MyourCar.web;

import java.util.List;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.service.cars.CarsService;
import com.MyourCar.web.dto.CarsResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class CarsController {
    private final CarsService carsService;

    @RequestMapping("/users/{id}")
    public CarsResponseDto findById(@PathVariable Long id) {
        return carsService.findById(id);
    }
}
