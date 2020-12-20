package com.MyourCar.service.services;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.domain.services.Services;
import com.MyourCar.domain.services.ServicesRepository;
import com.MyourCar.domain.user.User;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.security.UserPrincipal;
import com.MyourCar.web.dto.ServicesResponseDto;
import com.MyourCar.web.dto.ServicesSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ServicesService {

    private final ServicesRepository servicesRepository;
    private final CarsRepository carsRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long save(ServicesSaveRequestDto servicesSaveRequestDto) {
        Cars car = carsRepository.getOne(servicesSaveRequestDto.getCarId());
        User user = userRepository.getOne(servicesSaveRequestDto.getUserId());
        return servicesRepository.save(servicesSaveRequestDto.toEntity(user, car)).getId();
    }

    @Transactional(readOnly = true)
    public ServicesResponseDto findByUserOrCar(UserPrincipal userPrincipal, String related, Long id) {
        Optional<Services> optionalServices;
        if(related.equals("user")) {
            User user = userRepository.getOne(id);
            optionalServices = servicesRepository.findFirstByUserOrderByCreatedDateDesc(user);
            return new ServicesResponseDto(optionalServices.get());
        }
        else {
            Cars cars = carsRepository.getOne(id);
            optionalServices = servicesRepository.findFirstByCarsOrderByCreatedDateDesc(cars);
            return new ServicesResponseDto(optionalServices.get(), userPrincipal);
        }
    }

}
