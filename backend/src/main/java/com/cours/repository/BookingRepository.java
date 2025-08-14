package com.cours.repository;

import com.cours.entity.Booking;
import com.cours.entity.Course;
import com.cours.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByStudent(User student);
    
    List<Booking> findByCourse(Course course);
    
    List<Booking> findByCourseTeacher(User teacher);
    
    List<Booking> findByStatus(Booking.Status status);
    
    List<Booking> findByStudentAndStatus(User student, Booking.Status status);
    
    List<Booking> findByCourseTeacherAndStatus(User teacher, Booking.Status status);
    
    @Query("SELECT b FROM Booking b WHERE b.course.teacher = :teacher AND b.startTime BETWEEN :startDate AND :endDate")
    List<Booking> findTeacherBookingsInDateRange(@Param("teacher") User teacher, 
                                                 @Param("startDate") LocalDateTime startDate, 
                                                 @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT b FROM Booking b WHERE b.student = :student AND b.startTime BETWEEN :startDate AND :endDate")
    List<Booking> findStudentBookingsInDateRange(@Param("student") User student, 
                                                 @Param("startDate") LocalDateTime startDate, 
                                                 @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT b FROM Booking b WHERE b.course = :course AND " +
           "((b.startTime <= :startTime AND b.endTime > :startTime) OR " +
           "(b.startTime < :endTime AND b.endTime >= :endTime) OR " +
           "(b.startTime >= :startTime AND b.endTime <= :endTime)) AND " +
           "b.status IN ('PENDING', 'CONFIRMED')")
    List<Booking> findConflictingBookings(@Param("course") Course course, 
                                          @Param("startTime") LocalDateTime startTime, 
                                          @Param("endTime") LocalDateTime endTime);
}
