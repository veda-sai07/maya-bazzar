package com.example.shop.config;

import com.example.shop.model.Product;
import com.example.shop.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

/** Adds a few sample products the first time the app runs against an empty database. */
@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedProducts(ProductRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(List.of(
                        new Product("Wireless Mouse", new BigDecimal("599.00")),
                        new Product("Mechanical Keyboard", new BigDecimal("2499.00")),
                        new Product("USB-C Cable", new BigDecimal("199.50")),
                        new Product("Laptop Stand", new BigDecimal("1299.00")),
                        new Product("Notebook (Pack of 3)", new BigDecimal("249.00")),
                        new Product("Water Bottle", new BigDecimal("349.99"))
                ));
            }
        };
    }
}
