package com.MyourCar.web;

import com.MyourCar.domain.user.User;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.exception.ResourceNotFoundException;
import com.MyourCar.security.CurrentUser;
import com.MyourCar.security.UserPrincipal;
import com.MyourCar.service.user.UserService;
import com.MyourCar.web.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@RestController
public class UserApiController {

    private final UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserResponseDto getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return new UserResponseDto(userPrincipal);
    }
}
