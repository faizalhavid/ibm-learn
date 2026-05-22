package com.warmup.student_management.student.DTO.Requests;

import com.warmup.student_management.core.entities.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class StudentResponse extends BaseEntity {
    private String id;
    private String name;
    private String email;
    private Long studentIdentity;
    private String major;
}
