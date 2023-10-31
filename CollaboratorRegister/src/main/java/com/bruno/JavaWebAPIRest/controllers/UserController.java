package com.bruno.JavaWebAPIRest.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bruno.JavaWebAPIRest.entities.User;
import com.bruno.JavaWebAPIRest.repositories.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/users")
public class UserController {

	@Autowired
	private UserRepository repository;
	
	@GetMapping
	public List<User> findAll() {
		return repository.findAll();
	}
	
	@PostMapping
	public User insert(@RequestBody User user) {
		return repository.save(user);
	}
	
	@DeleteMapping(value = "/delete/{id}")
	public void deleteUser(@PathVariable Long id) {
		repository.deleteById(id);
	}

	@PutMapping(value = "/update/{id}")
	public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
		User existingUser = repository.findById(id).orElse(null);
	
		if (existingUser != null) {
			existingUser.setName(updatedUser.getName());
			existingUser.setEmail(updatedUser.getEmail());
			existingUser.setDepartment(updatedUser.getDepartment()); // Set the department
	
			return repository.save(existingUser);
		} else {
			return null;
		}
	}
	
}