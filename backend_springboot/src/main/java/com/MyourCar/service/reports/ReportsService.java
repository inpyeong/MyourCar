package com.MyourCar.service.reports;

import com.MyourCar.domain.reports.Reports;
import com.MyourCar.domain.reports.ReportsRepository;
import com.MyourCar.domain.services.Services;
import com.MyourCar.domain.services.ServicesRepository;
import com.MyourCar.web.dto.ReportsSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class ReportsService {
    private final ServicesRepository servicesRepository;
    private final ReportsRepository reportsRepository;

    @Transactional
    public Long save(ReportsSaveRequestDto reportsSaveRequestDto) {
        Services services = servicesRepository.getOne(1L);
        Reports reports = reportsSaveRequestDto.toEntity();
        reports.setServices(services);
        return reportsRepository.save(reports).getId();
    }
}
