package com.MyourCar.service.cars;

import com.MyourCar.config.auth.dto.SessionUser;
import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.domain.user.User;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.web.dto.CarsResponseDto;
import com.MyourCar.web.dto.CarsSaveRequestDto;
import com.MyourCar.web.dto.CarsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.Optional;

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
    public Long updateServiceEnable(CarsUpdateRequestDto requestDto) {
        SessionUser user = (SessionUser) httpSession.getAttribute("user");

        Long id = userRepository.findByEmail(user.getEmail()).get().getId();

        return 1L;
    }

}
