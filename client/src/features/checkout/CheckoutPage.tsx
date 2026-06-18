import {
    Box,
    Button,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
    FormControlLabel,
    Switch
  } from "@mui/material";
  import { useState } from "react";
  import AddressForm from "./AddressForm";
  import PaymentForm from "./PaymentForm";
  import Review from "./Review";
  import { FormProvider, useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  
  import { BasketItem } from "../../app/models/basket";
  import { toast } from "react-toastify";
  import agent from "../../app/api/agent";
  import { useAppDispatch } from "../../app/store/configureStore";
  import { setBasket } from "../basket/basketSlice";
import { ValidationRules } from "./validationRules";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import MockPaymentForm from "./MockPaymentForm";
  
  
  const steps = ["Shipping address", "Review your order", "Payment details"];
  
  function getStepContent(step: number, isMock: boolean) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <Review />;
      case 2:
        return isMock ? <MockPaymentForm /> : <PaymentForm />;
      default:
        throw new Error("Unknown step");
    }
  }
  
  export default function CheckoutPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [orderNumber, setOrderNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isMock, setIsMock] = useState(true); 
    
    const currentValdationRule = ValidationRules[activeStep];
    const methods = useForm({
      mode: "all",
      resolver: (activeStep === 2 && isMock) ? undefined : yupResolver(currentValdationRule),
    }); 
    const dispatch = useAppDispatch();
    
    const stripe = useStripe();
    const elements = useElements();

    const handleNext = async () => {
      const isValid = await methods.trigger();
  
      if (isValid) {
        const data: any = methods.getValues();
        
        if (activeStep === steps.length - 1) {
          const basket = await agent.Basket.get();
          if (!basket) return;

          try {
            setLoading(true);

            if (!isMock) {
                if (!stripe || !elements) return;
                const basketWithIntent = await agent.Payments.createPaymentIntent(basket.id);
                const cardElement = elements.getElement(CardElement);
                if (!cardElement) throw new Error("Card element not found");

                const result = await stripe.confirmCardPayment(basketWithIntent.clientSecret, {
                    payment_method: { card: cardElement }
                });

                if (result.error) throw new Error(result.error.message);
            } else {
                // MOCK FLOW: Just wait a bit
                await new Promise(resolve => setTimeout(resolve, 1500));
            }

            const subTotal = calculateSubTotal(basket.items);
            const deliveryFee = 200;

            const orderDto = {
                basketId: basket.id,
                shippingAddress: {
                  name: data.firstName + " " + data.lastName,
                  address1: data.address1,
                  address2: data.address2,
                  city: data.city,
                  state: data.state,
                  zipcode: data.zip,
                  country: data.country,
                },
                subTotal: subTotal,
                deliveryFee: deliveryFee              
            };

            const orderId = await agent.Orders.create(orderDto);
            setOrderNumber(orderId); 
            setActiveStep(activeStep + 1);          
            
            // Cleanup
            agent.Basket.deleteBasket(basket.id);
            dispatch(setBasket(null));
            localStorage.removeItem('basket_id');
            localStorage.removeItem('basket');   
            toast.success("Order placed successfully!");              
          } catch (error: any) {
            console.error("Order Error:", error);
            toast.error(error.message || "Failed to process order.");
          } finally {
            setLoading(false);
          }
        } else {
          setActiveStep(activeStep + 1);
        }
      }
    };
  
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };
  
    const calculateSubTotal = (items: BasketItem[]): number => {
      return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };
  
    return (
      <FormProvider {...methods}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
             <FormControlLabel 
                control={<Switch checked={isMock} onChange={() => setIsMock(!isMock)} />} 
                label={isMock ? "Mock Mode (ON)" : "Stripe Mode (OFF)"} 
             />
          </Box>

          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h5" gutterBottom color="primary">
                  Thank you for your order!
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Your order ID is: #{orderNumber}
                </Typography>
                <Typography variant="body1">
                  Your package will be delivered to: <br />
                  <strong>{methods.getValues().address1}, {methods.getValues().city}</strong>
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  We have sent a confirmation email to your registered address.
                </Typography>
                <Button variant="contained" sx={{ mt: 4 }} onClick={() => window.location.href = '/'}>
                  Continue Shopping
                </Button>
              </Box>
            ) : (
              <>
                {getStepContent(activeStep, isMock)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                     </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={loading}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {loading ? "Processing..." : (activeStep === steps.length - 1 ? "Place order" : "Next")}
                  </Button>
                </Box>
              </>
            )}
          </>
        </Paper>
      </FormProvider>
    );
  }