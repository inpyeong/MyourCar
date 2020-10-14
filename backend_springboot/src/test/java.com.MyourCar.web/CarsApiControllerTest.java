package java.com.MyourCar.web;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.cars.CarsRepository;
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
public class CarsApiControllerTest {
    private CarsRepository carsRepository;

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
        List<Cars> carsList = carsRepository.findAll();

        // then
        Cars cars = carsList.get(0);
        assertThat(cars.getId()).isEqualTo(id);
        assertThat(cars.getName()).isEqualTo(name);
        assertThat(cars.getPhoneNumber()).isEqualTo(phoneNumber);
        assertThat(cars.getEmail()).isEqualTo(email);
        assertThat(cars.getState()).isEqualTo(state);
        assertThat(cars.getAddress()).isEqualTo(address);
        assertThat(cars.getWarning()).isEqualTo(warning);

    }
}