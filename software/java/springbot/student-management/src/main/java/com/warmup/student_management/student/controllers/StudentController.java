package com.warmup.student_management.student.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.warmup.student_management.core.QueryParams;
import com.warmup.student_management.student.DTO.Requests.StudentRequest;
import com.warmup.student_management.student.DTO.Requests.StudentResponse;
import com.warmup.student_management.student.services.StudentService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@Controller
@RequestMapping("/students")
@AllArgsConstructor

public class StudentController {

    private final StudentService studentService;

    @GetMapping("")
    public ResponseEntity<List<StudentResponse>> getAllStudents(@ModelAttribute QueryParams queryParams) {
        return ResponseEntity.ok(studentService.getAllStudents(queryParams));
    }

    @PostMapping("")
    public ResponseEntity<StudentResponse> addNewStudent(@RequestBody StudentRequest studentRequest) {
        return ResponseEntity.ok(studentService.addNewStudent(studentRequest));
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<StudentResponse> updateStudent(@PathVariable String studentId,
            @RequestBody StudentRequest studentRequest) {
        return ResponseEntity.ok(studentService.updateStudent(studentId, studentRequest));
    }

    @DeleteMapping("safe-delete/{studentId}")
    public ResponseEntity<String> safeDeleteStudent(@PathVariable String studentId) {
        studentService.safeDeleteStudent(studentId);
        return ResponseEntity.ok("Student successfully safe deleted.");
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<String> deleteStudent(@PathVariable String studentId) {
        studentService.deleteStudent(studentId);
        return ResponseEntity.ok("Student successfully deleted");
    }

}
