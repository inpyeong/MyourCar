package com.MyourCar.web;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.exception.BadRequestException;
import com.MyourCar.exception.ResourceNotFoundException;
import com.MyourCar.security.CurrentUser;
import com.MyourCar.security.UserPrincipal;
import com.MyourCar.service.cars.CarsService;
import com.MyourCar.web.dto.CarsListResponseDto;
import com.MyourCar.web.dto.CarsResponseDto;
import com.MyourCar.web.dto.CarsSaveRequestDto;
import com.MyourCar.web.dto.CarsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CarsApiController {

    private final CarsService carsService;

    @GetMapping("/api/cars/{id}")
    public CarsResponseDto findById(@PathVariable Long id) {
        return carsService.findById(id);
    }

    @GetMapping("/api/cars")
    public List<CarsListResponseDto> findByUser(@RequestParam Long userId) {
        return carsService.findByUser(userId);
    }

    @GetMapping("/api/cars/recommend")
    public List<CarsListResponseDto> findByCallCoordsAndCallServiceTime(@RequestParam String coords, @RequestParam String serviceTime) {
        return carsService.findByCallCoordsAndCallServiceTime(coords, serviceTime);
    }

    @PostMapping("/api/cars")
    public Long save(@CurrentUser UserPrincipal userPrincipal, @RequestBody CarsSaveRequestDto carsSaveRequestDto){
        return carsService.save(carsSaveRequestDto, userPrincipal);
    }

    @PatchMapping("/api/cars/{id}")
    public Long update(@PathVariable Long id, @RequestBody CarsUpdateRequestDto requestDto) {
        return carsService.update(id, requestDto);
    }

    @DeleteMapping("/api/cars/{id}")
    public Long delete(@PathVariable Long id) {
        carsService.delete(id);
        return id;
    }

}
