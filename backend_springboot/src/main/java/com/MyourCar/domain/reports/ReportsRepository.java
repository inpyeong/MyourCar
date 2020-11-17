package com.MyourCar.domain.reports;

import com.MyourCar.domain.services.Services;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReportsRepository extends JpaRepository<Reports, Long> {

    Optional<Reports> findByServices(Services services);
}
