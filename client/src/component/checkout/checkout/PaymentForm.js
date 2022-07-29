import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

// Payment form
export default function PaymentForm({ handleOnChange }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              inputProps={{ maxLength: 40 }}
              id="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              onChange={(e) => handleOnChange(e, 'cardName')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              inputProps={{ maxLength: '19' }}
              id="cardNumber"
              label="Card number (Eg: 1111 1111 1111 1111)"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              onChange={(e) => handleOnChange(e, 'cardNum')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              inputProps={{ maxLength: 5 }}
              required
              id="expDate"
              label="Expiry date (Eg: 12/24)"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              onChange={(e) => handleOnChange(e, 'expiry')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              inputProps={{ maxLength: 3 }}
              id="cvv"
              label="CVV (Eg: 123)"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              onChange={(e) => handleOnChange(e, 'cvv')}
            />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
