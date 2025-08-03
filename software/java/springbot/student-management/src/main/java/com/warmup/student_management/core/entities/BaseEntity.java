package com.warmup.student_management.core.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @UpdateTimestamp
    private LocalDateTime createdAt;

    private LocalDateTime updateAt;

    private LocalDateTime deleteAt;

    private boolean isDeleted;

}
