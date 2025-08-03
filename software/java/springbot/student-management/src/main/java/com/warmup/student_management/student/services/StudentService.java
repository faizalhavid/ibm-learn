package com.warmup.student_management.student.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.warmup.student_management.student.entities.Student;
import com.warmup.student_management.student.repositories.StudentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}
