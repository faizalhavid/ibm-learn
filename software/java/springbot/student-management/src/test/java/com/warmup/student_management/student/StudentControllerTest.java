package com.warmup.student_management.student;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.warmup.student_management.core.QueryParams;
import com.warmup.student_management.school.entities.Major;
import com.warmup.student_management.student.DTO.Requests.StudentRequest;
import com.warmup.student_management.student.DTO.Requests.StudentResponse;
import com.warmup.student_management.student.controllers.StudentController;
import com.warmup.student_management.student.services.StudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class StudentControllerTest {

    @Mock
    private StudentService studentService;

    @InjectMocks
    private StudentController studentController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    private StudentRequest studentRequest;
    private StudentResponse studentResponse;
    private Major major;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(studentController).build();
        objectMapper = new ObjectMapper();

        // Setup test data
        major = new Major();
        major.setId("major-1");
        major.setName("Computer Science");

        studentRequest = new StudentRequest();
        studentRequest.setName("John Doe");
        studentRequest.setEmail("john.doe@example.com");
        studentRequest.setStudentIdentity(12345L);
        studentRequest.setMajor(major);

        studentResponse = new StudentResponse();
        studentResponse.setId("student-1");
        studentResponse.setName("John Doe");
        studentResponse.setEmail("john.doe@example.com");
        studentResponse.setStudentIdentity(12345L);
        studentResponse.setMajor("Computer Science");
        studentResponse.setCreatedAt(LocalDateTime.now());
        studentResponse.setIsDeleted(false);
    }

    @Test
    void getAllStudents_ShouldReturnListOfStudents() throws Exception {
        // Given
        StudentResponse student2 = new StudentResponse();
        student2.setId("student-2");
        student2.setName("Jane Smith");
        student2.setEmail("jane.smith@example.com");
        student2.setStudentIdentity(67890L);
        student2.setMajor("Mathematics");
        student2.setCreatedAt(LocalDateTime.now());
        student2.setIsDeleted(false);

        List<StudentResponse> students = Arrays.asList(studentResponse, student2);
        when(studentService.getAllStudents(any(QueryParams.class))).thenReturn(students);

        // When & Then
        mockMvc.perform(get("/students")
                .param("search", "John")
                .param("order", "ASC")
                .param("page", "0")
                .param("limit", "10"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value("student-1"))
                .andExpect(jsonPath("$[0].name").value("John Doe"))
                .andExpect(jsonPath("$[0].email").value("john.doe@example.com"))
                .andExpect(jsonPath("$[0].major").value("Computer Science"))
                .andExpect(jsonPath("$[1].id").value("student-2"))
                .andExpect(jsonPath("$[1].name").value("Jane Smith"));

        verify(studentService, times(1)).getAllStudents(any(QueryParams.class));
    }

    @Test
    void getAllStudents_ShouldReturnEmptyList_WhenNoStudentsExist() throws Exception {
        // Given
        when(studentService.getAllStudents(any(QueryParams.class))).thenReturn(Arrays.asList());

        // When & Then
        mockMvc.perform(get("/students"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));

        verify(studentService, times(1)).getAllStudents(any(QueryParams.class));
    }

    @Test
    void addNewStudent_ShouldCreateStudent_WhenValidRequest() throws Exception {
        // Given
        when(studentService.addNewStudent(any(StudentRequest.class))).thenReturn(studentResponse);

        // When & Then
        mockMvc.perform(post("/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(studentRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value("student-1"))
                .andExpect(jsonPath("$.name").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john.doe@example.com"))
                .andExpect(jsonPath("$.major").value("Computer Science"));

        verify(studentService, times(1)).addNewStudent(any(StudentRequest.class));
    }

    @Test
    void updateStudent_ShouldUpdateStudent_WhenValidRequest() throws Exception {
        // Given
        String studentId = "student-1";
        StudentResponse updatedResponse = new StudentResponse();
        updatedResponse.setId(studentId);
        updatedResponse.setName("John Updated");
        updatedResponse.setEmail("john.updated@example.com");
        updatedResponse.setMajor("Computer Science");

        when(studentService.updateStudent(eq(studentId), any(StudentRequest.class))).thenReturn(updatedResponse);

        // When & Then
        mockMvc.perform(put("/students/{studentId}", studentId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(studentRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(studentId))
                .andExpect(jsonPath("$.name").value("John Updated"))
                .andExpect(jsonPath("$.email").value("john.updated@example.com"));

        verify(studentService, times(1)).updateStudent(eq(studentId), any(StudentRequest.class));
    }

    @Test
    void safeDeleteStudent_ShouldMarkStudentAsDeleted_WhenStudentExists() throws Exception {
        // Given
        String studentId = "student-1";
        doNothing().when(studentService).safeDeleteStudent(studentId);

        // When & Then
        mockMvc.perform(delete("/students/safe-delete/{studentId}", studentId))
                .andExpect(status().isOk())
                .andExpect(content().string("Student successfully safe deleted."));

        verify(studentService, times(1)).safeDeleteStudent(studentId);
    }

    @Test
    void deleteStudent_ShouldDeleteStudent_WhenStudentExists() throws Exception {
        // Given
        String studentId = "student-1";
        doNothing().when(studentService).deleteStudent(studentId);

        // When & Then
        mockMvc.perform(delete("/students/{studentId}", studentId))
                .andExpect(status().isOk())
                .andExpect(content().string("Student successfully deleted"));

        verify(studentService, times(1)).deleteStudent(studentId);
    }
}