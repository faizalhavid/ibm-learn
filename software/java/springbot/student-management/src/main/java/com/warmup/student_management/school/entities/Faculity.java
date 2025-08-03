package com.warmup.student_management.school.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.warmup.student_management.core.entities.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "m_faculties")
public class Faculity extends BaseEntity {

    private String name;
    private String description;
    private String code;

    @OneToMany(mappedBy = "faculity", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Major> majors;

}
