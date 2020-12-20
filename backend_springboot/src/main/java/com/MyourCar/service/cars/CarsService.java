package com.MyourCar.service.cars;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
import com.MyourCar.domain.reviews.Reviews;
import com.MyourCar.domain.services.Services;
import com.MyourCar.domain.services.ServicesRepository;
import com.MyourCar.domain.user.AuthProvider;
import com.MyourCar.domain.user.User;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.payload.ApiResponse;
import com.MyourCar.security.UserPrincipal;
import com.MyourCar.util.TimeUtils;
import com.MyourCar.web.dto.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarsService {
    private final UserRepository userRepository;
    private final CarsRepository carsRepository;
    private final ServicesRepository servicesRepository;
    private final ObjectMapper objectMapper;

    @Transactional(readOnly = true)
    public CarsResponseDto findById(Long id) {
        Cars entity = carsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 차량이 없습니다. id=" + id));

        return new CarsResponseDto(entity);
    }

    @Transactional(readOnly = true)
    public List<CarsListResponseDto> findByUser(Long userId) {
        User user = userRepository.getOne(userId);
        return carsRepository.findByUser(user).stream()
                .map(CarsListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CarsListResponseDto> findByCallCoordsAndCallServiceTime(String coords, String serviceTime) {
        Double callLatitude = Double.parseDouble(coords.split(",")[0]),
                callLongitude = Double.parseDouble(coords.split(",")[1]);

        String[] serviceTimeArray = serviceTime.split(",");
        serviceTimeArray[0] = TimeUtils.transferDateTime(serviceTimeArray[0]);
        serviceTimeArray[3] = TimeUtils.transferDateTime(serviceTimeArray[3]);

        String callStartTimeStr = String.format("%s %s:%s:00", serviceTimeArray[0], serviceTimeArray[1], serviceTimeArray[2]);
        String callEndTimeStr = String.format("%s %s:%s:00", serviceTimeArray[3], serviceTimeArray[4], serviceTimeArray[5]);

        Timestamp callStartTime = TimeUtils.parseTimestamp(callStartTimeStr);
        Timestamp callEndTime = TimeUtils.parseTimestamp(callEndTimeStr);

        return carsRepository.findByCallCoordsAndCallServiceTime(callLatitude, callLongitude, callStartTimeStr, callEndTimeStr).stream()
                .map(CarsListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public Long save(CarsSaveRequestDto carsSaveRequestDto, UserPrincipal userPrincipal) {
        User user = userRepository.getOne(userPrincipal.getId());

        return carsRepository.save(carsSaveRequestDto.toEntity(user)).getId();
    }

    @Transactional
    public Long update(Long id, CarsUpdateRequestDto requestDto) {
        Cars cars = carsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 차량이 없습니다. id=" + id));

        cars.update(requestDto.getServiceEnable(),
                requestDto.getCurrentLocationLatitude(), requestDto.getCurrentLocationLongitude(),
                requestDto.getReturnLocationLatitude(), requestDto.getReturnLocationLongitude(),
                requestDto.getAvailableStartTime(), requestDto.getAvailableEndTime(), requestDto.getRentFee(),
                requestDto.getTimeFee(), requestDto.getBattery());

        return id;
    }

    @Transactional
    public void delete(Long id) {
        Cars cars = carsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 차량이 없습니다. id=" + id));

        carsRepository.delete(cars);
    }

}
