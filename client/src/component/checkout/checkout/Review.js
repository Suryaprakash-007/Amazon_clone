import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux/';

// Review form
export default function Review({
  fullName,
  address,
  city,
  state,
  zip,
  country,
  nameOnCard,
  cardNum,
  expiry,
  totalPriceState,
}) {
  // Payment details of the card
  const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: nameOnCard },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-' + cardNum.slice(15) },
    { name: 'Expiry date', detail: expiry },
  ];

  const cartList = useSelector((state) => state.userInfo.userList.cart);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        <strong>Order summary</strong>
      </Typography>
      <List disablePadding>
        {cartList.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.name}
              secondary={'Qty:' + product.qty}
            />
            <Typography variant="body2">
              ${product.price * product.qty}
            </Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $5
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPriceState}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            <strong>Shipping Address</strong>
          </Typography>
          <Typography gutterBottom>{fullName}</Typography>
          <Typography gutterBottom>{address}</Typography>
          <Typography gutterBottom>{city}</Typography>
          <Typography gutterBottom>{state}</Typography>
          <Typography gutterBottom>{zip}</Typography>
          <Typography gutterBottom>{country}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            <strong>Payment details</strong>
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
