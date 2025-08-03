package com.warmup.student_management.student.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.warmup.student_management.student.entities.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {

}
