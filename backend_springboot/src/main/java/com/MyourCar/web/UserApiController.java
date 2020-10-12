package com.MyourCar.web;

import com.MyourCar.service.users.UsersService;
import com.MyourCar.web.dto.UsersResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class UserApiController {

    private final UsersService usersService;

    @GetMapping("/user/{id}")
    public UsersResponseDto findById(@PathVariable Long id) {
        return usersService.findById(id);
    }

}
