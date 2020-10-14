package com.MyourCar.domain.cars;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Cars {
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

    @Builder
    public Cars(Long id, String name, String phoneNumber, String email, Integer state, String address, Integer warning) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.state = state;
        this.address = address;
        this.warning = warning;
    }
}
