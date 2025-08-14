package com.cours.repository;

import com.cours.entity.Review;
import com.cours.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    List<Review> findByTeacher(User teacher);
    
    List<Review> findByStudent(User student);
    
    List<Review> findByTeacherOrderByCreatedAtDesc(User teacher);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.teacher = :teacher")
    Double getAverageRatingByTeacher(@Param("teacher") User teacher);
    
    @Query("SELECT COUNT(r) FROM Review r WHERE r.teacher = :teacher")
    Long getReviewCountByTeacher(@Param("teacher") User teacher);
    
    @Query("SELECT r FROM Review r WHERE r.teacher = :teacher ORDER BY r.createdAt DESC")
    List<Review> findRecentReviewsByTeacher(@Param("teacher") User teacher);
}
