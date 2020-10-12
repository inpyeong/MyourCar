package com.MyourCar.service.users;

import com.MyourCar.domain.users.Users;
import com.MyourCar.domain.users.UsersRepository;
import com.MyourCar.web.dto.UsersResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UsersService {
    private final UsersRepository usersRepository;

    public UsersResponseDto findById(Long id) {
        Users entity = usersRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다. id=" + id));

        return new UsersResponseDto(entity);
    }

}
