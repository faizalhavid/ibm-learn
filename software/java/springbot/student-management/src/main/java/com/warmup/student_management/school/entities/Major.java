package com.warmup.student_management.school.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.warmup.student_management.core.entities.BaseEntity;
import com.warmup.student_management.student.entities.Student;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "m_majors")
public class Major extends BaseEntity {

    private String name;
    private String description;
    private String code;

    @ManyToOne
    @JoinColumn(name = "faculity_id")
    @JsonBackReference
    private Faculity faculity;

    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Curriculumn> curriculumns;

    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Student> students;

}
