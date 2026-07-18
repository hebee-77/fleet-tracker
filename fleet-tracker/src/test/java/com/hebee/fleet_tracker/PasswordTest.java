package com.hebee.fleet_tracker;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordTest {

    @Test
    void generatePassword() {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        System.out.println(encoder.encode("admin123"));

    }

}