import { Grid, Typography } from "@mui/material";
import { CardElement } from "@stripe/react-stripe-js";

export default function PaymentForm() {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Payment Method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div style={{ padding: '10px', border: '1px solid #ced4da', borderRadius: '4px' }}>
                        <CardElement options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }} />
                    </div>
                </Grid>
            </Grid>
        </>
    );
}