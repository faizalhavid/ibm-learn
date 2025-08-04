package com.warmup.student_management.student.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.warmup.student_management.core.QueryParams;
import com.warmup.student_management.core.enums.OrderType;
import com.warmup.student_management.student.DTO.Requests.StudentRequest;
import com.warmup.student_management.student.DTO.Requests.StudentResponse;
import com.warmup.student_management.student.entities.Student;
import com.warmup.student_management.student.repositories.StudentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;

    public List<StudentResponse> getAllStudents(QueryParams queryParams) {
        Pageable pageable = PageRequest.of(queryParams.getPage(), queryParams.getLimit(),
                Sort.by(queryParams.getOrder() == OrderType.ASC ? Sort.Direction.ASC : Sort.Direction.DESC, "name"));
        List<Student> students = studentRepository.findUseQueryParams(queryParams.getSearch(), pageable);
        if (students.isEmpty()) {
            return new ArrayList<>();
        }
        return students.stream().map(t -> modelMapper(t)).toList();
    }

    public StudentResponse getStudentById(String id) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            return modelMapper(student.get());
        }
        return new StudentResponse();
    }

    public StudentResponse addNewStudent(StudentRequest studentRequest) {

        if (!studentRepository.findByEmail(studentRequest.getEmail()).isEmpty()) {
            throw new IllegalArgumentException("A student with this email already exists.");
        }

        Student newStudent = new Student();
        newStudent.setName(studentRequest.getName());
        newStudent.setEmail(studentRequest.getEmail());
        newStudent.setStudentIdentity(studentRequest.getStudentIdentity());
        newStudent.setMajor(studentRequest.getMajor());

        Student savedStudent = studentRepository.save(newStudent);

        return modelMapper(savedStudent);
    }

    public StudentResponse updateStudent(String id, StudentRequest studentRequest) {
        Optional<Student> existingStudentOpt = studentRepository.findById(id);
        if (existingStudentOpt.isEmpty()) {
            throw new IllegalArgumentException("The Student not found.");
        }

        Student existingStudent = existingStudentOpt.get();
        existingStudent.setName(studentRequest.getName());
        existingStudent.setEmail(studentRequest.getEmail());
        existingStudent.setStudentIdentity(studentRequest.getStudentIdentity());
        existingStudent.setMajor(studentRequest.getMajor());

        Student savedStudent = studentRepository.save(existingStudent);

        return modelMapper(savedStudent);
    }

    public void safeDeleteStudent(String id) {
        Optional<Student> exitingStudent = studentRepository.findById(id);
        if (exitingStudent.isEmpty()) {
            throw new IllegalArgumentException("The Student not found.");
        }

        exitingStudent.get().setIsDeleted(true);
        exitingStudent.get().setDeleteAt(LocalDateTime.now());
        studentRepository.save(exitingStudent.get());
    }

    public void deleteStudent(String id) {
        Optional<Student> exitingStudent = studentRepository.findById(id);
        if (exitingStudent.isEmpty()) {
            throw new IllegalArgumentException("The Student not found.");
        }
        studentRepository.delete(exitingStudent.get());
    }

    private StudentResponse modelMapper(Student student) {
        StudentResponse mappedData = new StudentResponse();
        mappedData.setId(student.getId());
        mappedData.setName(student.getName());
        mappedData.setEmail(student.getEmail());
        mappedData.setMajor(student.getMajor().getName());
        mappedData.setCreatedAt(student.getCreatedAt());
        mappedData.setIsDeleted(student.getIsDeleted());

        return mappedData;
    }
}
