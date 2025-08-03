package com.warmup.student_management.student.entities;

import com.warmup.student_management.core.entities.BaseEntity;
import com.warmup.student_management.core.enums.StudentStatus;
import com.warmup.student_management.school.entities.Curriculumn;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "t_student_curriculumn")
public class StudentCurriculumn extends BaseEntity {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "curriculumn_id", nullable = false)
    private Curriculumn curriculumn;

    @Enumerated(EnumType.STRING)
    private StudentStatus status;

    private Integer entryYear;

    @Column(nullable = true)
    private Integer graduationYear;
}
