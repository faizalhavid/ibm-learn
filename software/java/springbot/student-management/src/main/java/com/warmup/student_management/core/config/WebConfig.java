package com.warmup.student_management.core.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.warmup.student_management.core.converters.StringToOrderTypeConverter;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private StringToOrderTypeConverter stringToOrderTypeConverter;

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(stringToOrderTypeConverter);
    }
}
