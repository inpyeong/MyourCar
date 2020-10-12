package com.MyourCar.web.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UsersResponseDto {

    private final String name;
    private final int amount;

}
