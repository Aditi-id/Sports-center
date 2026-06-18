import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography, Box, Grid } from "@mui/material";
import { useState } from "react";

export default function MockPaymentForm() {
    const [paymentMethod, setPaymentMethod] = useState('upi');

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Select Mock Payment Method
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    row
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <FormControlLabel value="upi" control={<Radio />} label="UPI (PayTM/GooglePay)" />
                    <FormControlLabel value="qr" control={<Radio />} label="Scan QR Code" />
                    <FormControlLabel value="netbanking" control={<Radio />} label="Net Banking" />
                </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 3, p: 2, border: '1px dashed grey', borderRadius: 2 }}>
                {paymentMethod === 'upi' && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Enter UPI ID (e.g. aditi@upi)" placeholder="anything@upi" variant="outlined" />
                        </Grid>
                        <Typography variant="caption" sx={{ ml: 2, mt: 1 }}>* In Mock Mode, you can enter any ID to proceed.</Typography>
                    </Grid>
                )}

                {paymentMethod === 'qr' && (
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body1" gutterBottom>Scan this QR code with any UPI app</Typography>
                        <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MockPayment" 
                            alt="Mock QR Code" 
                            style={{ margin: '10px auto', display: 'block' }}
                        />
                        <Typography variant="caption">Transaction ID will be generated automatically.</Typography>
                    </Box>
                )}

                {paymentMethod === 'netbanking' && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Select Bank" placeholder="HDFC, SBI, ICICI, etc." variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="User ID / Customer ID" variant="outlined" />
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box>
    );
}
