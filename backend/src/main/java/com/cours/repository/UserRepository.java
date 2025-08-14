package com.cours.repository;

import com.cours.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    List<User> findByRole(User.Role role);
    
    @Query("SELECT u FROM User u WHERE u.role = 'TEACHER' AND (" +
           "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.bio) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<User> findTeachersBySearch(@Param("search") String search);
    
    @Query("SELECT u FROM User u WHERE u.role = 'TEACHER' AND u.hourlyRate BETWEEN :minPrice AND :maxPrice")
    List<User> findTeachersByPriceRange(@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice);
}
