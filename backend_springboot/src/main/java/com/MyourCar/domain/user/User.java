package com.MyourCar.domain.user;

import com.MyourCar.domain.cars.Cars;
import com.MyourCar.domain.services.Services;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String phoneNumber;

    @Column(nullable = false)
    private Integer state;

    @Column(length = 100, nullable = false)
    private Integer warning;

    @OneToMany(mappedBy = "user")
    private Set<Cars> cars = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Services> services = new HashSet<>();
}