package com.warmup.student_management.student.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.warmup.student_management.core.entities.BaseEntity;
import com.warmup.student_management.school.entities.Major;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity(name = "m_students")
@EqualsAndHashCode(callSuper = true)
public class Student extends BaseEntity {

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private Long studentIdentity;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "major_id", nullable = false)
    @JsonBackReference
    private Major major;

    // @ManyToMany
    // @JoinTable(name = "student_curiculumn", joinColumns = @JoinColumn(name =
    // "student_id"), inverseJoinColumns = @JoinColumn(name = "curiculmn_id"))
    // List<Curriculumn> curriculumns;

}
