package com.MyourCar.service.cars;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.domain.user.User;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.web.dto.CarsResponseDto;
import com.MyourCar.web.dto.CarsSaveRequestDto;
import com.MyourCar.web.dto.CarsUpdateRequestDto;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class CarsService {
    private final UserRepository userRepository;
    private final CarsRepository carsRepository;
    private final HttpSession httpSession;

//    public CarsResponseDto findById(Long id) {
//        Cars entity = carsRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다. id=" + id));
//
//        return new CarsResponseDto(entity);
//    }

    @Transactional
    public Long save(CarsSaveRequestDto carsSaveRequestDto) {
        return carsRepository.save(carsSaveRequestDto.toEntity()).getId();
    }

    @Transactional
    public int patch(long id, CarsUpdateRequestDto carsUpdateRequestDto) {
        Optional<Cars> optionalCars = carsRepository.findById(id);
        if (optionalCars.isPresent()) {
            Cars cars = optionalCars.get();
            if (StringUtils.isNotBlank(carsUpdateRequestDto.getReturn_location()))
                cars.setReturn_location(carsUpdateRequestDto.getReturn_location());
            if (carsUpdateRequestDto.getAvailable_start_time() != null)
                cars.setAvailable_start_time(carsUpdateRequestDto.getAvailable_start_time());
            if (carsUpdateRequestDto.getAvailable_end_time() != null)
                cars.setAvailable_end_time(carsUpdateRequestDto.getAvailable_end_time());
            if (carsUpdateRequestDto.getRent_fee() != null)
                cars.setRent_fee(carsUpdateRequestDto.getRent_fee());
            if (carsUpdateRequestDto.getDriving_fee() != null)
                cars.setDriving_fee(carsUpdateRequestDto.getDriving_fee());
            return 1;
        }
        return 0;
    }
}
