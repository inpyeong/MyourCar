package com.MyourCar.service.reports;

import com.MyourCar.domain.reports.Reports;
import com.MyourCar.domain.reports.ReportsRepository;
import com.MyourCar.domain.services.Services;
import com.MyourCar.domain.services.ServicesRepository;
import com.MyourCar.web.dto.ReportsResponseDto;
import com.MyourCar.web.dto.ReportsSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class ReportsService {

    private final ServicesRepository servicesRepository;
    private final ReportsRepository reportsRepository;

    @Transactional
    public Long save(ReportsSaveRequestDto reportsSaveRequestDto) {
        Services services = servicesRepository.getOne(reportsSaveRequestDto.getServiceId());

        return reportsRepository.save(reportsSaveRequestDto.toEntity(services)).getId();
    }

    @Transactional(readOnly = true)
    public ReportsResponseDto findByServices(Long serviceId) {
        Services services = servicesRepository.getOne(serviceId);

        Reports entity = reportsRepository.findByServices(services)
                .orElseThrow(() -> new IllegalArgumentException("해당 서비스에 대한 신고 정보가 없습니다."));

        return new ReportsResponseDto(entity);
    }
}
