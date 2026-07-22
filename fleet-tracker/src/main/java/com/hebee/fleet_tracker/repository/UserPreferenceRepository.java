package com.hebee.fleet_tracker.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hebee.fleet_tracker.entity.User;
import com.hebee.fleet_tracker.entity.UserPreference;

@Repository
public interface UserPreferenceRepository extends JpaRepository<UserPreference, Long> {

    Optional<UserPreference> findByUser(User user);

    Optional<UserPreference> findByUserId(Long userId);

    boolean existsByUser(User user);

    boolean existsByUserId(Long userId);
}