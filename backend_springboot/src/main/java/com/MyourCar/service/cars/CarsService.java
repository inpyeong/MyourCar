package com.MyourCar.service.cars;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.web.dto.CarsResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CarsService {
    private final CarsRepository carsRepository;

    public CarsResponseDto findById(Long id) {
        Cars entity = carsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다. id=" + id));

        return new CarsResponseDto(entity);
    }
}
