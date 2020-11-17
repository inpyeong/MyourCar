package com.MyourCar.web;

import com.MyourCar.security.CurrentUser;
import com.MyourCar.security.UserPrincipal;
import com.MyourCar.service.services.ServicesService;
import com.MyourCar.web.dto.ServicesResponseDto;
import com.MyourCar.web.dto.ServicesSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class ServicesApiController {

    private final ServicesService servicesService;

    @PostMapping("/api/services")
    public Long create(@RequestBody ServicesSaveRequestDto servicesSaveRequestDto){
        return servicesService.save(servicesSaveRequestDto);
    }

    @GetMapping("/api/services")
    public ServicesResponseDto findByUserOrCar(@CurrentUser UserPrincipal userPrincipal, @RequestParam String related, @RequestParam Long id) {
        return servicesService.findByUserOrCar(userPrincipal, related, id);
    }

}
