package com.warmup.student_management.core;

import com.warmup.student_management.core.enums.OrderType;

import lombok.Data;

@Data
public class QueryParams {
    private String search;
    private OrderType order = OrderType.ASC;
    private int page = 0;
    private int limit = 10;
}
