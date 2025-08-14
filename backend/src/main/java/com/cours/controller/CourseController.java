package com.cours.controller;

import com.cours.entity.Course;
import com.cours.entity.User;
import com.cours.repository.CourseRepository;
import com.cours.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:4200")
public class CourseController {
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Optional<Course> course = courseRepository.findById(id);
        return course.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<Course>> getCoursesByTeacher(@PathVariable Long teacherId) {
        Optional<User> teacher = userRepository.findById(teacherId);
        if (teacher.isPresent()) {
            return ResponseEntity.ok(courseRepository.findByTeacher(teacher.get()));
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/subject/{subject}")
    public ResponseEntity<List<Course>> getCoursesBySubject(@PathVariable String subject) {
        return ResponseEntity.ok(courseRepository.findBySubject(subject));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Course>> searchCourses(@RequestParam String query) {
        return ResponseEntity.ok(courseRepository.findBySearch(query));
    }
    
    @GetMapping("/subjects")
    public ResponseEntity<List<String>> getAllSubjects() {
        return ResponseEntity.ok(courseRepository.findAllSubjects());
    }
    
    @GetMapping("/levels")
    public ResponseEntity<List<String>> getAllLevels() {
        return ResponseEntity.ok(courseRepository.findAllLevels());
    }
    
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course savedCourse = courseRepository.save(course);
        return ResponseEntity.ok(savedCourse);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course course) {
        if (courseRepository.existsById(id)) {
            course.setId(id);
            Course updatedCourse = courseRepository.save(course);
            return ResponseEntity.ok(updatedCourse);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
