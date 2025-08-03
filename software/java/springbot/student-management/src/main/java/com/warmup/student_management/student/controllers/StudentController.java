package com.warmup.student_management.student.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.warmup.student_management.student.entities.Student;
import com.warmup.student_management.student.services.StudentService;

import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/students")
@AllArgsConstructor

public class StudentController {

    private final StudentService studentService;

    @GetMapping("/all")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

}
