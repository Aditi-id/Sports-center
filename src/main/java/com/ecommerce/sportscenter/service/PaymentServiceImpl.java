package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.entity.Basket;
import com.ecommerce.sportscenter.entity.BasketItem;
import com.ecommerce.sportscenter.model.BasketItemResponse;
import com.ecommerce.sportscenter.model.BasketResponse;
import com.ecommerce.sportscenter.repository.BasketRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.PaymentIntentUpdateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final BasketRepository basketRepository;

    @Value("${stripe.secret.key}")
    private String secretKey;

    public PaymentServiceImpl(BasketRepository basketRepository) {
        this.basketRepository = basketRepository;
    }

    @Override
    public BasketResponse createOrUpdatePaymentIntent(String basketId) throws StripeException {
        Stripe.apiKey = secretKey;
        Optional<Basket> basketOptional = basketRepository.findById(basketId);
        if (basketOptional.isEmpty()) return null;

        Basket basket = basketOptional.get();
        long shippingPrice = 0L; // Fixed for now
        long subtotal = basket.getItems().stream()
                .mapToLong(item -> item.getPrice() * item.getQuantity())
                .sum();
        long amount = (subtotal + shippingPrice) * 100; // Stripe expects cents

        PaymentIntent intent;
        if (basket.getPaymentIntentId() == null || basket.getPaymentIntentId().isEmpty()) {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amount)
                    .setCurrency("inr") // Assuming INR based on price points
                    .addPaymentMethodType("card")
                    .build();
            intent = PaymentIntent.create(params);
            basket.setPaymentIntentId(intent.getId());
            basket.setClientSecret(intent.getClientSecret());
        } else {
            PaymentIntentUpdateParams params = PaymentIntentUpdateParams.builder()
                    .setAmount(amount)
                    .build();
            intent = PaymentIntent.retrieve(basket.getPaymentIntentId());
            intent.update(params);
        }

        basketRepository.save(basket);
        return convertToBasketResponse(basket);
    }

    private BasketResponse convertToBasketResponse(Basket basket) {
        List<BasketItemResponse> itemResponses = basket.getItems().stream()
                .map(this::convertToBasketItemResponse)
                .collect(Collectors.toList());
        return BasketResponse.builder()
                .id(basket.getId())
                .items(itemResponses)
                .paymentIntentId(basket.getPaymentIntentId())
                .clientSecret(basket.getClientSecret())
                .build();
    }

    private BasketItemResponse convertToBasketItemResponse(BasketItem basketItem) {
        return BasketItemResponse.builder()
                .id(basketItem.getId())
                .name(basketItem.getName())
                .description(basketItem.getDescription())
                .price(basketItem.getPrice())
                .pictureUrl(basketItem.getPictureUrl())
                .productBrand(basketItem.getProductBrand())
                .productType(basketItem.getProductType())
                .quantity(basketItem.getQuantity())
                .build();
    }
}
