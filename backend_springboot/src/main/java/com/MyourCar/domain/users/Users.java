package com.MyourCar.domain.users;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Users {

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

}
