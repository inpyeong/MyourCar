package com.MyourCar.web;

import com.MyourCar.service.cars.CarsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
public class CarsController {
    private final CarsService carsService;

    public CarsController(CarsService carsService){
        this.carsService = carsService;
    }

    @RequestMapping("/users/{id}")
    public CarsResponseDto findById(@PathVariable Long id) {
        return carsService.findById(id);
    }

    @RequestMapping(value = "/post", method = RequestMethod.POST)
    @ResponseBody
    public String create(CarsResponseDto carsResponseDto){
        carsService.savePost(carsResponseDto);
        return "redirect:/";
    }
}
