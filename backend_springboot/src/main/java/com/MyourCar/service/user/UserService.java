package com.MyourCar.service.user;

import com.MyourCar.config.auth.dto.SessionUser;
import com.MyourCar.domain.user.User;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.web.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final HttpSession httpSession;

    public UserResponseDto findByEmail() {

        SessionUser user = (SessionUser) httpSession.getAttribute("user");

        User entity = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다. email=" + user.getEmail()));

        return new UserResponseDto(entity);
    }

    public UserResponseDto findById(Long id) {

        User entity = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다. id=" + id));

        return new UserResponseDto(entity);
    }
}
