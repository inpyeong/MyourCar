package com.MyourCar.config.auth;

import com.MyourCar.domain.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http

                .headers().frameOptions().disable()
                .and()
                    .authorizeRequests()
                    .antMatchers("/api/**").hasRole(Role.GUEST.name())
                    .anyRequest().authenticated()
                .and()
                    .logout()
                        // Deep Linking 해서 설정한 URL 작성하기.
                        .logoutSuccessUrl("/")
                .and()
                    .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                    .oauth2Login()
                        .userInfoEndpoint()
                            .userService(customOAuth2UserService);
    }
}