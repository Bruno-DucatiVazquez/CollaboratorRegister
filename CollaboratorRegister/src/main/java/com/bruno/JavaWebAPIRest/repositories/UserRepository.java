package com.bruno.JavaWebAPIRest.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bruno.JavaWebAPIRest.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

}