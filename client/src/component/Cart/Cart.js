import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/';
import { Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import './Cart.css';
import CartItem from './CartItem';
import Grid from '@mui/material/Grid';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux/';
import { updateOrderPlacing } from '../../store/userSlice';
import Alert from '@mui/material/Alert';

const Cart = () => {
  const dispatch = useDispatch();

  // Cart list details from store
  const cartList = useSelector((state) => state.userInfo.userList?.cart);
  // User ID from store
  const userId = useSelector((state) => state.userInfo.userList?._id);

  // Alert box for indicating empty cart
  const [alert, setAlert] = React.useState(false);

  // Cookie reviever from browser
  const [cookie, setCookie] = useCookies(['user']);
  // Key data from cookie
  var { key } = cookie;

  // UseNavigate to navigate between routes
  const navigate = useNavigate();
  // Total price variable of the cart
  let total = 0;

  // Loop for getting the total price
  cartList?.forEach((item) => {
    total += item.qty * item.price;
  });

  // Function to update the cart data in the DB whenever the cart list changes in the store
  const updateCartInDb = async (cartList) => {
    const updateCartDb = await fetch('http://localhost:3002/api/updateCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        cart: cartList,
        key: key,
      }),
    });
  };

  // Whenever the cart list changes, re-render the component
  useEffect(() => {
    updateCartInDb(cartList);
  }, [cartList]);

  return cartList?.length > 0 ? (
    <div style={{ marginTop: '8em', marginBottom: '22em' }}>
      <h2 style={{ marginLeft: '1em' }}>My cart</h2>
      {alert && (
        <Alert style={{ width: '16em', margin: '0.5em auto' }} severity="error">
          Product is out of stock !
        </Alert>
      )}
      <Grid style={{ margin: '1em auto', width: '99%' }} container spacing={2}>
        <Grid
          className="scrollContainerCart"
          style={{ overflowY: 'scroll', maxHeight: '70vh' }}
          item
          xs={12}
          md={8}
          lg={8}
        >
          <div>
            {cartList?.length &&
              cartList?.map((item, i) => (
                <div key={i}>
                  <CartItem
                    setAlert={setAlert}
                    price={item.price}
                    name={item.name}
                    image={item.image}
                    qty={item.qty}
                    id={item.id}
                  />
                  <hr />
                </div>
              ))}
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <div>
            <h3>{`Subtotal of (${cartList?.length}) items`}</h3>
            <h5>Grand Total: ${total}</h5>
            <Button
              style={{ backgroundColor: 'black' }}
              className="checkout_button"
              onClick={() => {
                dispatch(updateOrderPlacing(true));
                navigate('/checkout');
                // callStripe()
              }}
            >
              CHECKOUT
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  ) : (
    <div style={{ marginTop: '8em' }}>
      <h2 style={{ marginLeft: '1em' }}>My Cart</h2>
      <div
        style={{ marginTop: '10em', textAlign: 'center', marginBottom: '17em' }}
      >
        <img
          style={{ marginBottom: '0.5em' }}
          src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-3428238-2902697.png"
          alt="Empty cart"
          height={'240px'}
        />
        <p>
          Your cart is empty{' '}
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            shop now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Cart;
