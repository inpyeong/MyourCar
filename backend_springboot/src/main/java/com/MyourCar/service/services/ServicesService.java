package com.MyourCar.service.services;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.domain.reviews.Reviews;
import com.MyourCar.domain.reviews.ReviewsRepository;
import com.MyourCar.domain.services.Services;
import com.MyourCar.domain.services.ServicesRepository;
import com.MyourCar.domain.user.User;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.web.dto.ReviewsSaveRequestDto;
import com.MyourCar.web.dto.ServicesSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class ServicesService {
    private final ServicesRepository servicesRepository;
    private final CarsRepository carsRepository;
    private final UserRepository userRepository;
    private final HttpSession httpSession;

//    public CarsResponseDto findById(Long id) {
//        Cars entity = carsRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다. id=" + id));
//
//        return new CarsResponseDto(entity);
//    }

    @Transactional
    public Long save(ServicesSaveRequestDto servicesSaveRequestDto) {
        Cars car = carsRepository.getOne(4L);
        User user = userRepository.getOne(1L);
        Services services = servicesSaveRequestDto.toEntity();
        services.setCars(car);
        services.setUser(user);
        return servicesRepository.save(services).getId();
    }

//    @Transactional
//    public int patch(long id, CarsUpdateRequestDto carsUpdateRequestDto) {
//        Optional<Cars> optionalCars = carsRepository.findById(id);
//        if (optionalCars.isPresent()) {
//            Cars cars = optionalCars.get();
//            if (StringUtils.isNotBlank(carsUpdateRequestDto.getReturn_location()))
//                cars.setReturn_location(carsUpdateRequestDto.getReturn_location());
//            if (carsUpdateRequestDto.getAvailable_start_time() != null)
//                cars.setAvailable_start_time(carsUpdateRequestDto.getAvailable_start_time());
//            if (carsUpdateRequestDto.getAvailable_end_time() != null)
//                cars.setAvailable_end_time(carsUpdateRequestDto.getAvailable_end_time());
//            if (carsUpdateRequestDto.getRent_fee() != null)
//                cars.setRent_fee(carsUpdateRequestDto.getRent_fee());
//            if (carsUpdateRequestDto.getDriving_fee() != null)
//                cars.setDriving_fee(carsUpdateRequestDto.getDriving_fee());
//            return 1;
//        }
//        return 0;
//    }
}
