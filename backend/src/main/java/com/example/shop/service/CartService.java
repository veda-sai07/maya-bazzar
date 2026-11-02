package com.example.shop.service;

import com.example.shop.dto.CartItemResponse;
import com.example.shop.dto.CartResponse;
import com.example.shop.exception.NotFoundException;
import com.example.shop.model.CartItem;
import com.example.shop.model.Product;
import com.example.shop.repository.CartItemRepository;
import com.example.shop.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * All cart changes return the full, freshly calculated cart so the
 * frontend always shows totals that match the database.
 */
@Service
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartService(CartItemRepository cartItemRepository, ProductRepository productRepository) {
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public CartResponse getCart() {
        return buildCart();
    }

    @Transactional
    public CartResponse addProduct(Long productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product " + productId + " not found"));

        CartItem item = cartItemRepository.findByProductId(productId).orElse(null);
        if (item == null) {
            cartItemRepository.save(new CartItem(product, quantity));
        } else {
            item.setQuantity(Math.min(999, item.getQuantity() + quantity));
        }
        return buildCart();
    }

    @Transactional
    public CartResponse updateQuantity(Long itemId, int quantity) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new NotFoundException("Cart item " + itemId + " not found"));
        item.setQuantity(quantity);
        return buildCart();
    }

    @Transactional
    public CartResponse removeItem(Long itemId) {
        if (!cartItemRepository.existsById(itemId)) {
            throw new NotFoundException("Cart item " + itemId + " not found");
        }
        cartItemRepository.deleteById(itemId);
        return buildCart();
    }

    @Transactional
    public CartResponse clear() {
        cartItemRepository.deleteAll();
        return buildCart();
    }

    private CartResponse buildCart() {
        cartItemRepository.flush();
        List<CartItemResponse> items = cartItemRepository.findAllByOrderByIdAsc().stream()
                .map(CartItemResponse::from)
                .toList();
        return CartResponse.of(items);
    }
}
