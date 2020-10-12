package com.MyourCar.web;

import com.MyourCar.web.dto.UsersResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserApiController {

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

    @GetMapping("/user/{id}")
    public UsersResponseDto findById(@PathVariable Long id) {

    }
}
