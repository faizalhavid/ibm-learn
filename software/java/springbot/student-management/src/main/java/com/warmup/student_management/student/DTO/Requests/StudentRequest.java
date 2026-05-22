package com.warmup.student_management.student.DTO.Requests;

import com.warmup.student_management.school.entities.Major;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentRequest {

    @NotNull
    @NotBlank
    private String name;

    @NotNull
    @Email
    private String email;

    @NotNull
    private Long studentIdentity;

    @NotNull
    private Major major;
}
