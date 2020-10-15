package com.MyourCar.web;

import com.MyourCar.domain.user.User;
import com.MyourCar.domain.user.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@RunWith(SpringRunner.class)
//@WebMvcTest(controllers = UserApiController.class)
@SpringBootTest
public class UserApiControllerTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void findByIdTest() {
        // get
        Long id = 1L;
        String name = "이인평";
        String phoneNumber = "01033637093";
        String email = "jinipyung@gmail.com";
        Integer state = 0;
        String address = "서울시 강서구";
        Integer warning = 0;

//        usersRepository.save(Users.builder()
//                .id(5l)
//                .name(name)
//                .phoneNumber(phoneNumber)
//                .email(email)
//                .state(state)
//                .address(address)
//                .warning(warning)
//                .build());

        // when
        List<User> userList = userRepository.findAll();

        // then
        User users = userList.get(0);
        assertThat(users.getId()).isEqualTo(id);
        assertThat(users.getName()).isEqualTo(name);
        assertThat(users.getPhoneNumber()).isEqualTo(phoneNumber);
        assertThat(users.getEmail()).isEqualTo(email);
        assertThat(users.getState()).isEqualTo(state);
        assertThat(users.getAddress()).isEqualTo(address);
        assertThat(users.getWarning()).isEqualTo(warning);

    }
}
