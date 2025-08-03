package com.warmup.student_management.student.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.warmup.student_management.student.entities.StudentCurriculumn;

@Repository
public interface StudentCurriculmn extends JpaRepository<StudentCurriculumn, String> {

}
