package com.cours.controller;

import com.cours.entity.User;
import com.cours.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "http://localhost:4200")
public class TeacherController {
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllTeachers() {
        return ResponseEntity.ok(userRepository.findByRole(User.Role.TEACHER));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getTeacherById(@PathVariable Long id) {
        Optional<User> teacher = userRepository.findById(id);
        if (teacher.isPresent() && teacher.get().getRole() == User.Role.TEACHER) {
            return ResponseEntity.ok(teacher.get());
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchTeachers(@RequestParam String query) {
        return ResponseEntity.ok(userRepository.findTeachersBySearch(query));
    }
    
    @GetMapping("/price-range")
    public ResponseEntity<List<User>> getTeachersByPriceRange(
            @RequestParam Double minPrice, 
            @RequestParam Double maxPrice) {
        return ResponseEntity.ok(userRepository.findTeachersByPriceRange(minPrice, maxPrice));
    }
}
