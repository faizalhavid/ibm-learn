package com.warmup.student_management.school.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.warmup.student_management.core.entities.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity(name = "m_curiculumns")
@EqualsAndHashCode(callSuper = true)
public class Curriculumn extends BaseEntity {

    private String name;

    private int year;

    @ManyToOne
    @JoinColumn(name = "major_id")
    @JsonBackReference
    private Major major;

    @ManyToMany
    @JoinTable(name = "curriculumn_courses", joinColumns = @JoinColumn(name = "curriculumn_id"), inverseJoinColumns = @JoinColumn(name = "course_id"))
    @JsonBackReference
    private List<Course> courses;

}
