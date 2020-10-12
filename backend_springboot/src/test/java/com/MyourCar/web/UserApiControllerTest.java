package com.MyourCar.web;

import com.MyourCar.domain.users.Users;
import com.MyourCar.domain.users.UsersRepository;
import lombok.Data;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@RunWith(SpringRunner.class)
//@WebMvcTest(controllers = UserApiController.class)
@SpringBootTest
public class UserApiControllerTest {

    @Autowired
    private UsersRepository usersRepository;

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
        List<Users> usersList = usersRepository.findAll();

        // then
        Users users = usersList.get(0);
        assertThat(users.getId()).isEqualTo(id);
        assertThat(users.getName()).isEqualTo(name);
        assertThat(users.getPhoneNumber()).isEqualTo(phoneNumber);
        assertThat(users.getEmail()).isEqualTo(email);
        assertThat(users.getState()).isEqualTo(state);
        assertThat(users.getAddress()).isEqualTo(address);
        assertThat(users.getWarning()).isEqualTo(warning);

    }
}
