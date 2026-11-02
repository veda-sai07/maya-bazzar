package com.example.shop.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record AddToCartRequest(
        @NotNull(message = "productId is required")
        Long productId,

        @Min(value = 1, message = "Quantity must be at least 1")
        @Max(value = 999, message = "Quantity cannot exceed 999")
        Integer quantity
) {
    /** Quantity defaults to 1 when not supplied. */
    public int quantityOrDefault() {
        return quantity == null ? 1 : quantity;
    }
}
