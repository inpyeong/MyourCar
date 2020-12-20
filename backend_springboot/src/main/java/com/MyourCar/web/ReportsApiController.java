package com.MyourCar.web;

import com.MyourCar.service.reports.ReportsService;
import com.MyourCar.service.services.ServicesService;
import com.MyourCar.web.dto.ReportsResponseDto;
import com.MyourCar.web.dto.ReportsSaveRequestDto;
import com.MyourCar.web.dto.ServicesSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class ReportsApiController {
    private final ReportsService reportsService;

    @PostMapping("/api/reports")
    public Long create(@RequestBody ReportsSaveRequestDto reportsSaveRequestDto){
        return reportsService.save(reportsSaveRequestDto);
    }

    @GetMapping("/api/reports")
    public ReportsResponseDto findByServices(@RequestParam Long serviceId) {
        return reportsService.findByServices(serviceId);
    }

}
