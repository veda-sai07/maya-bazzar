package com.example.shop.controller;

import com.example.shop.dto.AddToCartRequest;
import com.example.shop.dto.CartResponse;
import com.example.shop.dto.UpdateQuantityRequest;
import com.example.shop.service.CartService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public CartResponse getCart() {
        return cartService.getCart();
    }

    @PostMapping("/items")
    public CartResponse addItem(@Valid @RequestBody AddToCartRequest request) {
        return cartService.addProduct(request.productId(), request.quantityOrDefault());
    }

    @PutMapping("/items/{itemId}")
    public CartResponse updateQuantity(@PathVariable Long itemId,
                                       @Valid @RequestBody UpdateQuantityRequest request) {
        return cartService.updateQuantity(itemId, request.quantity());
    }

    @DeleteMapping("/items/{itemId}")
    public CartResponse removeItem(@PathVariable Long itemId) {
        return cartService.removeItem(itemId);
    }

    @DeleteMapping
    public CartResponse clear() {
        return cartService.clear();
    }
}
