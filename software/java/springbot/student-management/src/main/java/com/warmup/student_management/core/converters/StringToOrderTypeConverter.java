package com.warmup.student_management.core.converters;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.warmup.student_management.core.enums.OrderType;

@Component
public class StringToOrderTypeConverter implements Converter<String, OrderType> {

    @Override
    public OrderType convert(String source) {
        return OrderType.fromString(source);
    }
}
