package com.MyourCar.web;

import com.MyourCar.security.CurrentUser;
import com.MyourCar.security.UserPrincipal;
import com.MyourCar.service.user.UserService;
import com.MyourCar.web.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class UserApiController {

    private final UserService userService;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserResponseDto getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return new UserResponseDto(userPrincipal);
    }
}
