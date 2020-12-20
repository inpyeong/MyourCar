package com.MyourCar.service.user;

import com.MyourCar.domain.user.User;
import com.MyourCar.domain.user.UserRepository;
import com.MyourCar.security.UserPrincipal;
import com.MyourCar.web.dto.UserUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Long update(UserUpdateRequestDto requestDto, UserPrincipal userPrincipal, String columnName) {
        Optional<User> optionalUser = userRepository.findById(userPrincipal.getId());
        if(columnName.equals("password")) {
            requestDto.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        }
        optionalUser.get().update(requestDto, columnName);

        return optionalUser.get().getId();
    }
}
