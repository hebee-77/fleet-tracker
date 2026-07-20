package com.hebee.fleet_tracker.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hebee.fleet_tracker.security.jwt.JwtAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

	private final UserDetailsService userDetailsService;
	private final JwtAuthenticationFilter jwtAuthenticationFilter;

	public SecurityConfig(UserDetailsService userDetailsService, JwtAuthenticationFilter jwtAuthenticationFilter) {

		this.userDetailsService = userDetailsService;
		this.jwtAuthenticationFilter = jwtAuthenticationFilter;
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	DaoAuthenticationProvider authenticationProvider() {

		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();

		provider.setUserDetailsService(userDetailsService);
		provider.setPasswordEncoder(passwordEncoder());

		return provider;
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

		return configuration.getAuthenticationManager();
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http

				.csrf(csrf -> csrf.disable())

				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

				.authenticationProvider(authenticationProvider())

				.authorizeHttpRequests(auth -> auth

						// Public APIs
						.requestMatchers("/api/auth/**", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html")
						.permitAll()

						// User Management (Admin Only)
						.requestMatchers("/api/users/**").hasRole("ADMIN")

						// Vehicle Module
						.requestMatchers("/api/vehicles/**").hasAnyRole("ADMIN", "MANAGER")

						// Driver Module
						.requestMatchers("/api/drivers/**").hasAnyRole("ADMIN", "MANAGER")

						// Dashboard
						.requestMatchers("/api/dashboard/**").hasAnyRole("ADMIN", "MANAGER")

						// Analytics
						.requestMatchers("/api/analytics/**").hasAnyRole("ADMIN", "MANAGER")

						// Everything else
						.anyRequest().authenticated())

				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
}