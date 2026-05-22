package com.warmup.student_management.student.repositories;

import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.warmup.student_management.student.entities.Student;
import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
    List<Student> findByEmail(String email);

    @Query("SELECT u FROM m_students u WHERE (:search IS NULL OR LOWER(u.name) LIKE(CONCAT('%', :search, '%')))")
    List<Student> findUseQueryParams(@Param("search") String search, Pageable pageable);
}
