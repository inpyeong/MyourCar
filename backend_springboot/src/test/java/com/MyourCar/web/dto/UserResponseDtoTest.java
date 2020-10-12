package com.MyourCar.web.dto;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class UserResponseDtoTest {

    @Test
    public void lombokTest() {
        // given
        String name = "test";
        int amount = 1000;

        // when
        UserResponseDto dto = new UserResponseDto(name, amount);

        // then
        assertThat(dto.getName()).isEqualTo(name);
        assertThat(dto.getAmount()).isEqualTo(amount);
    }
}
