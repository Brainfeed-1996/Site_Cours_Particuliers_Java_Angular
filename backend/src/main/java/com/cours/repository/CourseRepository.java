package com.cours.repository;

import com.cours.entity.Course;
import com.cours.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    
    List<Course> findByTeacher(User teacher);
    
    List<Course> findBySubject(String subject);
    
    List<Course> findByLevel(String level);
    
    List<Course> findBySubjectAndLevel(String subject, String level);
    
    @Query("SELECT c FROM Course c WHERE c.pricePerHour BETWEEN :minPrice AND :maxPrice")
    List<Course> findByPriceRange(@Param("minPrice") BigDecimal minPrice, @Param("maxPrice") BigDecimal maxPrice);
    
    @Query("SELECT c FROM Course c WHERE " +
           "LOWER(c.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.subject) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Course> findBySearch(@Param("search") String search);
    
    @Query("SELECT DISTINCT c.subject FROM Course c ORDER BY c.subject")
    List<String> findAllSubjects();
    
    @Query("SELECT DISTINCT c.level FROM Course c ORDER BY c.level")
    List<String> findAllLevels();
}
