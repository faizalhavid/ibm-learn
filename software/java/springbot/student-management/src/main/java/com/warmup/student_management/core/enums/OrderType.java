package com.warmup.student_management.core.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum OrderType {
    DESC("desc"),
    ASC("asc");

    private final String value;

    OrderType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static OrderType fromString(String value) {
        if (value == null || value.trim().isEmpty()) {
            return ASC; // Default value
        }

        for (OrderType orderType : OrderType.values()) {
            if (orderType.value.equalsIgnoreCase(value) || orderType.name().equalsIgnoreCase(value)) {
                return orderType;
            }
        }

        return ASC; // Default fallback
    }
}
