package com.example.shop.dto;

import com.example.shop.model.CartItem;

import java.math.BigDecimal;

/** A cart line: the product, how many, and price x quantity. */
public record CartItemResponse(
        Long id,
        Long productId,
        String name,
        BigDecimal price,
        int quantity,
        BigDecimal lineTotal
) {
    public static CartItemResponse from(CartItem item) {
        BigDecimal price = item.getProduct().getPrice();
        BigDecimal lineTotal = price.multiply(BigDecimal.valueOf(item.getQuantity()));
        return new CartItemResponse(
                item.getId(),
                item.getProduct().getId(),
                item.getProduct().getName(),
                price,
                item.getQuantity(),
                lineTotal
        );
    }
}
