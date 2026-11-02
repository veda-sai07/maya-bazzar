package com.example.shop.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateQuantityRequest(
        @NotNull(message = "Quantity is required")
        @Min(value = 1, message = "Quantity must be at least 1 (use DELETE to remove an item)")
        @Max(value = 999, message = "Quantity cannot exceed 999")
        Integer quantity
) {
}
