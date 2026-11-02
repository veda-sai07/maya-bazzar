package com.example.shop.dto;

import java.math.BigDecimal;
import java.util.List;

public record CartResponse(
        List<CartItemResponse> items,
        int totalItems,
        BigDecimal cartTotal
) {
    public static CartResponse of(List<CartItemResponse> items) {
        int totalItems = items.stream().mapToInt(CartItemResponse::quantity).sum();
        BigDecimal cartTotal = items.stream()
                .map(CartItemResponse::lineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return new CartResponse(items, totalItems, cartTotal);
    }
}
