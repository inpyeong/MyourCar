package com.MyourCar.domain.user;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.services.Services;
import com.MyourCar.security.UserPrincipal;
import com.MyourCar.web.dto.UserUpdateRequestDto;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Email
    @Column(nullable = false)
    private String email;

    private String imageUrl;

    @Column(nullable = false)
    private Boolean emailVerified = false;

    @JsonIgnore
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;



    @Column(length = 20, nullable = false)
    private String phoneNumber = "01000000000";

    @Column(nullable = false)
    private Integer state = 0;

    @Column(length = 100, nullable = false)
    private Integer warning = 0;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private Set<Cars> cars = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Services> services = new HashSet<>();

    public void update(UserUpdateRequestDto requestDto, String columnName) {

        switch(columnName)
        {
            case "password":
                String newPassword = requestDto.getPassword();
                this.password = newPassword;
                break;
            case "introduce":
                System.out.println("Set new introduce");
                break;
            case "phoneNumber":
                this.phoneNumber = requestDto.getPhoneNumber();
                break;
            default:
                throw new IllegalArgumentException("질의문자열이 잘못 입력되었습니다.");
        }
    }

    @Builder
    public User(UserPrincipal userPrincipal) {

    }
}