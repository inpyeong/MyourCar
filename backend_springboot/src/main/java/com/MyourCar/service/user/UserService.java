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
    private final UserRepository usersRepository;
    private final HttpSession httpSession;

    public UserResponseDto findByEmail() {

        SessionUser user = (SessionUser) httpSession.getAttribute("user");

        User entity = usersRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다. email=" + user.getEmail()));

        return new UserResponseDto(entity);
    }

    public UserResponseDto findById(Long id) {

        User entity = usersRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다. id=" + id));

        return new UserResponseDto(entity);
    }
}
