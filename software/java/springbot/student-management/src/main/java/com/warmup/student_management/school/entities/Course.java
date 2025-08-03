package com.warmup.student_management.school.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.warmup.student_management.core.entities.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity(name = "m_courses")
@EqualsAndHashCode(callSuper = true)
public class Course extends BaseEntity {

    private String name;

    private int credits;

    @ManyToMany(mappedBy = "courses")
    @JsonManagedReference
    private List<Curriculumn> curriculumns;

}
