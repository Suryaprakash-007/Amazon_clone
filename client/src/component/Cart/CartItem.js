import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart, removeFromCart } from '../../store/userSlice';
import './Cart.css';

const CartItem = ({ name, qty, price, image, id, setAlert }) => {
  // Products List from the store
  const products = useSelector((state) => state.productsList.products);

  // Dispatcher to dispatch actions to the store
  const dispatch = useDispatch();

  // Function to decrement the qantity of the product
  const removehandler = () => {
    // Action for decrementing the product quantity or remove it if it's quantity is 1
    dispatch(removeFromCart(id));
  };

  // Function to increment quantity in the cart
  const addHandler = () => {
    // Before adding products quantity, check if there is enough stock
    for (let i of products) {
      if (i.id == id) {
        if (i.quantity === 0) {
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 1500);
        } else {
          // Action to increment the quantity of the product in store
          dispatch(
            addtoCart({
              id,
              name,
              price,
              image,
            })
          );
        }
      }
    }
  };

  return (
    <div className="cartItem">
      <div className="galleryy">
        <img
          style={{ marginBottom: '0.5em' }}
          className="cart_image"
          src={image}
          alt="crack"
        ></img>
        <p className="product_name"> {name}</p>
      </div>
      <p>${price}/per</p>
      <div className="btnDiv">
        <button className="cart-actions" onClick={() => removehandler()}>
          -
        </button>
        <p>{qty}</p>
        <button className="cart-actions" onClick={() => addHandler()}>
          +
        </button>
      </div>
      <p className="cart_total">Total : ${price * qty}</p>
    </div>
  );
};

export default CartItem;
