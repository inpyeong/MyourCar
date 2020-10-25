package com.MyourCar.web;

import com.MyourCar.service.reports.ReportsService;
import com.MyourCar.service.services.ServicesService;
import com.MyourCar.web.dto.ReportsSaveRequestDto;
import com.MyourCar.web.dto.ServicesSaveRequestDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReportsApiController {
    private final ReportsService reportsService;

    public ReportsApiController(ReportsService reportsService){
        this.reportsService = reportsService;
    }

    @PostMapping("/api/reports")
    public Long create(@RequestBody ReportsSaveRequestDto reportsSaveRequestDto){
        return reportsService.save(reportsSaveRequestDto);
    }


//    @PutMapping("/api/reviews")
//    public Long update(@RequestBody CarsUpdateRequestDto requestDto) {
//        return reviewsService.updateServiceEnable(requestDto);
//    }

//    @PatchMapping("/api/reviews/{id}")
//    public Map<String, Object> patch(@PathVariable("id") long id, @RequestBody CarsUpdateRequestDto carsUpdateRequestDto) {
//        Map<String, Object> response = new HashMap<>();
//
//        if(carsService.patch(id, carsUpdateRequestDto) > 0) {
//            response.put("result", "SUCCESS");
//        } else {
//            response.put("result", "FAIL");
//            response.put("reason", "일치하는 회원 정보가 없습니다. 사용자 id를 확인해주세요.");
//        }
//
//        return response;
//    }
}
