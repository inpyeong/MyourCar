package com.MyourCar.domain.user;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.services.Services;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 20, nullable = false)
    private String phoneNumber;

    @Column(length = 45, nullable = false)
    private String email;

    @Column(nullable = false)
    private Integer state;

    @Column(length = 100, nullable = false)
    private String address;

    @Column(length = 100, nullable = false)
    private Integer warning;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "user")
    private Set<Cars> cars = new HashSet<>();

//    @OneToMany(mappedBy = "user")
//    private Services services;

    @OneToMany(mappedBy = "user")
    private Set<Services> services = new HashSet<>();

    @Builder
    public User(Long id, String name, String phoneNumber, String email, Integer state, String address, Integer warning, Role role) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.state = state;
        this.address = address;
        this.warning = warning;
        this.role = role;
    }

    public User update(String name) {
        this.name = name;

        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}