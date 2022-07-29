import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AddressForm from './AddressForm';
import { Link, useNavigate } from 'react-router-dom';
import './Checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo, updateOrderPlacing } from '../../../store/userSlice';
import { updateProducts } from '../../../store/productsSlice';
import { useCookies } from 'react-cookie';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useEffect } from 'react';
import DoneIcon from '@mui/icons-material/Done';

const steps = ['Shipping address'];

const theme = createTheme();

export default function Checkout({ step }) {
  var steps_order = step;
  // Step count for moving along the checkout forms
  const [activeStep, setActiveStep] = React.useState(0);
  // State to store the order ID
  const [orderIdState, setOrderId] = React.useState();

  // Cookies from browser
  const [cookie, setCookie] = useCookies(['user']);
  // Key data from the cookie
  var { key } = cookie;

  // States for address form
  const [fullName, setName] = React.useState();
  const [address, setAddress] = React.useState();
  const [city, setCity] = React.useState();
  const [state, setState] = React.useState();
  const [zip, setZip] = React.useState();
  const [country, setCountry] = React.useState();

  // State for payment details

  // State to use in review

  // User list
  const userList = useSelector((state) => state.userInfo.userList);

  // Importing Cart from store
  const cartList = useSelector((state) => state.userInfo.userList.cart);

  // Geting UserID from state
  const userId = useSelector((state) => state.userInfo.userList._id);

  // Products from store
  const products = useSelector((state) => state.productsList.products);

  // Dispatcher to dispatch actions
  const dispatch = useDispatch();
  // Navigation between routes hook
  const navigate = useNavigate();
  const [alert, setalert] = React.useState(false);

  const isOrderPlacing = useSelector((state) => state.userInfo.orderPlacing);

  var totalPriceState = 0;
  cartList.forEach((i) => {
    totalPriceState += i.qty * i.price;
  });

  const callStripe = () => {
    const payment = fetch('http://localhost:3002/api/stripe_checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartList }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url, data }) => {
        window.location = url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function called when 'next' button is clicked on each form to go to the next form
  const handleNext = async () => {
    if (activeStep === 0) {
      if (fullName && address && city && zip && country) {
        await update_address();
        await callStripe();
      } else alertuser();
    }
  };

  const alertuser = () => {
    setalert(true);
    setTimeout(() => {
      setalert(false);
    }, 1500);
  };

  const update_address = async () => {
    const address_update = {
      street: address,
      city: city,
      pincode: zip,
      state: state,
      country: country,
    };
    const address_update_status = await fetch(
      'http://localhost:3002/api/updateAddress',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          // Empty cart is assigned to make the cart in the DB of the user to be empty

          key: key,
          address: address_update,
          // address:address_update
        }),
      }
    );
  };

  // Switch case's to provide forms
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            handleOnChange={handleOnChange}
            name={fullName}
            city={city}
            state={state}
            zip={zip}
            country={country}
            address1={address}
          />
        );
      case 1:
        return;

      default:
        throw new Error('Unknown step');
    }
  }

  // Function to populate the state values when change detected in the input field forms
  const handleOnChange = (event, name) => {
    if (name === 'fullName') {
      setName(event.target.value);
    } else if (name === 'address') {
      setAddress(event.target.value);
    } else if (name === 'city') {
      setCity(event.target.value);
    } else if (name === 'state') {
      setState(event.target.value);
    } else if (name === 'zip') {
      setZip(event.target.value);
    } else if (name === 'country') {
      setCountry(event.target.value);
    }
  };

  // To empty the cart after ordering the cart products
  const updateCart = async (orderId) => {
    // Before updating, stock of the product must be updated qith the cart data passed here
    const updateStock = await fetch('http://localhost:3002/api/updateStock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartList),
    });

    let updatedProductList = products;
    // Update Products in the store
    cartList.forEach((i) => {
      const updatedArr = updatedProductList.map((product) => {
        if (product.id == i.id) {
          console.log(product.quantity, 'Before');
          product.quantity = product.quantity - i.qty;
          console.log(product.quantity, 'After');
        }
        return product;
      });
      // Containes the updated stock data of the products
      updatedProductList = updatedArr;
    });
    const res = updatedProductList;
    dispatch(updateProducts({ res }));

    // Order details are stored here
    // console.log('update cart func')
    const orderDetails = {
      orderId: '#' + String(orderId),
      orderDate: new Date().toISOString().slice(0, 10),
      orderPrice: totalPriceState,
      orderStatus: 'PAID',
    };

    // After placing order, cart needs to be empty...So, this request is made
    const cartEMpty = await fetch('http://localhost:3002/api/updateCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        // Empty cart is assigned to make the cart in the DB of the user to be empty
        cart: [],
        key: key,
        orderDetails: orderDetails,
        // address:address_update
      }),
    });
    const resCart = await cartEMpty.json();

    // Response of the above request will hold the updated data of the current user and it is updated in the store.
    dispatch(updateUserInfo(resCart.data));
  };

  // Function used to get the order ID for each checkout
  const getOrderId = async () => {
    // console.log('orderid func')

    // console.log(totalPrice)
    const orderIdRequest = await fetch('http://localhost:3002/api/orderId');
    const orderId = await orderIdRequest.json();

    // Order ID state is updated here to display it finally on the client side (Front-End)
    setOrderId('#' + String(orderId));
    // Response container order ID
    await updateOrderHistoryReq('#' + String(orderId));
    // Update cart function is called here to empty the cart
    await updateCart(orderId);
  };

  // On every orders placed, Order history must be updated in the DB of the particular user.
  const updateOrderHistoryReq = async (orderId) => {
    // console.log('orderhistory func')
    const orderDetails = {
      userId: userId,
      orderId: orderId,
      orderDate: new Date().toISOString().slice(0, 10),
      orderPrice: totalPriceState,
      orderStatus: 'PAID',
    };

    // Update order history
    const orderHistoryRequest = await fetch(
      'http://localhost:3002/api/placeOrder',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      }
    );
    // const responseOrder = await orderHistoryRequest.json();

    // Send sms and email after conformation
    // console.log('send mail func')
    const userMailSmsObj = {
      total: totalPriceState,
      orderId: orderId,
      userName: userList.fullName,
      orderDate: new Date().toISOString().slice(0, 10),
      userMail: userList.email,
      phone: userList.mobile,
    };
    const sendMailAndSms = await fetch(
      'http://localhost:3002/api/confirmOrder',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMailSmsObj),
      }
    );
  };

  // Function for order id to be recived after the review form in the checkout
  const handleStep = () => {
    if (steps_order === 1) {
      // console.log('panni once')
      getOrderId();
      steps_order = 2;
    }
  };

  useEffect(() => {
    if (isOrderPlacing) handleStep();
    setName(userList?.fullName);
    setAddress(userList.address?.street);
    setCity(userList.address?.city);
    setCountry(userList.address?.country);
    setZip(userList.address?.pincode);
    setState(userList.address?.state);
  }, []);

  return isOrderPlacing ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        style={{ marginTop: '9em' }}
        component="main"
        maxWidth="sm"
        sx={{ mb: 4 }}
        className="shadow-lg"
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          {alert && (
            <Alert style={{ marginTop: '0.5em' }} severity="error">
              Please fill the required details!
            </Alert>
          )}
          <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{ padding: '1.5em' }}
          >
            CHECKOUT
          </Typography>

          <React.Fragment>
            {step === 1 && orderIdState ? (
              <React.Fragment>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '1em',
                    marginTop: '0',
                  }}
                >
                  <ThumbUpIcon
                    fontSize="large"
                    style={{
                      width: '1.5em',
                      height: '1.5em',
                    }}
                  />
                </div>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order ID is <b>{orderIdState}</b>. We have mailed you the
                  order confirmation and will send the update when the order has
                  been shipped.
                </Typography>
                <div style={{ textAlign: 'center', margin: '1em' }}>
                  <Button
                    startIcon={<DoneIcon />}
                    style={{
                      backgroundColor: 'green',
                      width: '20em',
                    }}
                    variant="contained"
                    onClick={() => {
                      dispatch(updateOrderPlacing(false));
                      navigate('/');
                    }}
                  >
                    OK
                  </Button>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleNext();
                    }}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Pay Now
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
      <br />
    </ThemeProvider>
  ) : (
    <p style={{ marginTop: '20em', marginBottom: '20em', textAlign: 'center' }}>
      You are not authorized here now !{' '}
      <Link to={'/'}>Click here to go home</Link>
    </p>
  );
}
