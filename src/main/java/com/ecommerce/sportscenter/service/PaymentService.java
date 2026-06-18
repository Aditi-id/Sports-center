package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.model.BasketResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {
    BasketResponse createOrUpdatePaymentIntent(String basketId) throws StripeException;
}
