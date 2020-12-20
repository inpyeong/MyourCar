package com.MyourCar.web;

import com.MyourCar.domain.user.User;
import com.MyourCar.domain.user.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserApiControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    @WithMockUser(roles="GUEST")
    public void findByIdTest() throws Exception {
        // get
        String name = "이인평";
        String phoneNumber = "01033637093";
        String email = "jinipyung@gmail.com";
        Integer state = 0;
        String address = "서울시 강서구";
        Integer warning = 0;

//        User savedUser = userRepository.save(User.builder()
//                .name(name)
//                .phoneNumber(phoneNumber)
//                .email(email)
//                .state(state)
//                .address(address)
//                .warning(warning)
//                .role(Role.GUEST)
//                .build());
//
//        Long savedUserId = savedUser.getId();
//
//        String url = "http://localhost:" + port + "/api/user/" + savedUserId;
//
//        // when
//        mvc.perform(get(url)).andDo(print())
//                .andExpect(status().isOk())
//
//        // then
//                .andExpect(jsonPath("name").value("이인평"))
//                .andExpect(jsonPath("phoneNumber").value("01033637093"))
//                .andExpect(jsonPath("email").value("jinipyung@gmail.com"))
//                .andExpect(jsonPath("state").value(0))
//                .andExpect(jsonPath("address").value("서울시 강서구"))
//                .andExpect(jsonPath("warning").value(0));
    }
}
