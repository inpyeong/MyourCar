package com.MyourCar.web;

import com.MyourCar.service.reports.ReportsService;
import com.MyourCar.service.services.ServicesService;
import com.MyourCar.web.dto.ReportsSaveRequestDto;
import com.MyourCar.web.dto.ServicesSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ReportsApiController {
    private final ReportsService reportsService;

    @PostMapping("/api/reports")
    public Long create(@RequestBody ReportsSaveRequestDto reportsSaveRequestDto){
        return reportsService.save(reportsSaveRequestDto);
    }

}
