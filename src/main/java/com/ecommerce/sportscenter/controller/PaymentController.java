package com.ecommerce.sportscenter.controller;

import com.ecommerce.sportscenter.model.BasketResponse;
import com.ecommerce.sportscenter.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/{basketId}")
    public ResponseEntity<BasketResponse> createOrUpdatePaymentIntent(@PathVariable String basketId) throws StripeException {
        BasketResponse basketResponse = paymentService.createOrUpdatePaymentIntent(basketId);
        if(basketResponse == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(basketResponse, HttpStatus.OK);
    }
}
