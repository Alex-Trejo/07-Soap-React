package com.soap.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // habilita CORS para todos los endpoints
                .allowedOrigins("http://localhost:5173")  // reemplaza con el puerto donde está tu aplicación React
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");  // métodos permitidos
    }

}
