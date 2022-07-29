import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';

// Address portion of the checkout form !
export default function AddressForm({ handleOnChange,name, city, state, zip,country, address1 }) {
 
  // const [useDefaultAddress, setUseDefaultAddress] = React.useState(false);

  // Function to handle check bpx change event
  // const handleCheckChange = () => {
  //   setUseDefaultAddress(!useDefaultAddress);
  // };



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Full name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={name}
            onChange={(e) => handleOnChange(e, 'fullName')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={address1}
            onChange={(e) => handleOnChange(e, 'address')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={city}
            onChange={(e) => handleOnChange(e, 'city')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={state}
            onChange={(e) => handleOnChange(e, 'state')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={zip}
            onChange={(e) => handleOnChange(e, 'zip')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={country}
            onChange={(e) => handleOnChange(e, 'country')}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Checkbox onChange={handleCheckChange} />
            <label>Use default address ?</label>
          </div>
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
