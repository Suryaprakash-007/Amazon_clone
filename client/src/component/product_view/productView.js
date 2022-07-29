import React, { useState, useEffect } from 'react';
import './product_view.css';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, CssBaseline } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../../store/userSlice';
import Timer from './Timer';
import { useSelector } from 'react-redux';
import { RWebShare } from 'react-web-share';
import Row from 'react-bootstrap/esm/Row';
import Stack from '@mui/material/Stack';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import CircularProgress from '@mui/material/CircularProgress';
import { useCookies } from 'react-cookie';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { updateUserInfo } from '../../store/userSlice';
import Alert from '@mui/material/Alert';

export const ProductView = ({ products }) => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState();
  const [quantity, setQuantity] = useState('1');
  const [add, setAdd] = useState(false);
  const isLogged = useSelector((state) => state.userInfo.isLogged);
  const userId = useSelector((state) => state.userInfo.userList?._id);
  const cartList = useSelector((state) => state.userInfo.userList?.cart);
  const [updated, setUpdated] = useState(false);
  const [alertContent, setAlertContent] = useState();
  const wishListState = useSelector(
    (state) => state.userInfo?.userList?.wishList
  );

  // State for alert
  const [isAlert, setIsAlert] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Date calculator for delivery
  let today = new Date();
  let dateToday = new Date();
  dateToday.setDate(today.getDate() + Math.random() * 10);
  let date = dateToday.toUTCString().slice(0, 16);

  // Cookie reviever from browser
  const [cookie, setCookie] = useCookies(['user']);
  // Key data from cookie
  var { key } = cookie;

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const updateData = () => {
    const filteredArr = products.filter((i) => String(i.id) === id);
    setProductDetails(filteredArr[0]);
  };

  useEffect(() => {
    updateData();
    updateCartInDb(cartList);
    setUpdated(true);
  }, [cartList, id]);

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

  const addcart = async () => {
    if (isLogged) {
      if (quantity <= productDetails.quantity) {
        dispatch(
          addtoCart({
            id: productDetails.id,
            name: productDetails.name,
            price: productDetails.price,
            qty: Number(quantity),
            image: productDetails.imgUrl,
          })
        );
        setAlertContent('Added to the cart !');
        setAdd(true);
        setTimeout(() => {
          setAdd(false);
        }, 1000);
      } else {
        setAlertContent('Quantity exceeds the stock availability !');
        setAdd(true);
        setTimeout(() => {
          setAdd(false);
        }, 1000);
      }
    } else {
      navigate('/signin');
    }
  };

  // Wish list function
  const addToWish = async () => {
    // If the product is not present in wish list -> returns false
    const isPresent = wishListState.some((i) => id === i.id);

    if (!isPresent) {
      const currentWish = {
        imgUrl: productDetails.imgUrl,
        name: productDetails.name,
        id,
      };

      const wishReq = await fetch('http://localhost:3002/api/updateWishList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key,
          userId,
          wishListState,
          currentWish,
        }),
      });
      const wishRes = await wishReq.json();

      dispatch(updateUserInfo(wishRes.data));
      setAlertContent({
        content: 'Product is successfully Added !',
        variant: 'success',
      });
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 2000);
    } else {
      setAlertContent({
        content: 'Product already exists !',
        variant: 'warning',
      });
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 2000);
    }
  };

  return updated ? (
    <section style={{ marginTop: '8em' }} className="product_display">
      <CssBaseline />
      <Container fluid={true}>
        <Row>
          <Col sm={8}>
            <div>
              <p>
                <strong>{productDetails.name}</strong>
              </p>
              <div className="product_image_content">
                <p>{productDetails.offer}% off</p>
                <img
                  className=" product_image"
                  src={productDetails.imgUrl}
                  alt="product"
                ></img>
                <RWebShare
                  data={{
                    text: `${productDetails.name}`,
                    url: 'http://localhost:3000',
                    title: 'Share',
                  }}
                  onClick={() => console.log('shared successfully!')}
                >
                  <a>
                    <ShareIcon className="share_icon" />
                  </a>
                </RWebShare>
              </div>
            </div>
          </Col>
          <Col sm={4} lg={true}>
            <div className="design">
              <h4 className="tittle">Product price details:</h4>
              <span className="product_price">
                <p className="product_price1">$</p>
                <p className="product_price2">{productDetails.price}</p>
              </span>
              <span className="mrp">
                <p>M.R.P.: </p>
                <p className="product_mrp">${productDetails.mrp}</p>
              </span>
              <p
                style={{
                  marginTop: '0.4em',
                  color: 'black',
                }}
              >
                <strong>EMI</strong> from ${productDetails.emi}. No Cost EMI
                available
              </p>
              <p style={{ color: 'black', marginTop: '0.5em' }}>
                Inclusive of all taxes
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="product_description design">
        <h4 className="tittle">Product description:</h4>
        <p style={{ marginTop: '1em' }}>{productDetails.description}</p>
      </div>

      <div className="cart_component design">
        <p style={{ color: 'black' }}>
          <strong>
            Total: ${Number(productDetails.price) * Number(quantity)}
          </strong>
        </p>
        <div style={{ marginTop: '1em' }}>
          FREE delivery <strong>{date}</strong>. Order within
          <strong>{<Timer />}</strong>.<a href="#">Details</a>
        </div>
        <div style={{ marginTop: '1em' }}>
          {' '}
          <a href="#">
            <p>
              <LocationOnIcon />
              Select delivery location
            </p>
          </a>
        </div>
        {productDetails.quantity <= 10 && productDetails.quantity > 1 ? (
          <p
            style={{
              marginTop: '1.7em',
              color: 'goldenrod',
              fontWeight: 'bolder',
            }}
          >
            Limited stock
          </p>
        ) : productDetails.quantity === 0 ? (
          <p
            style={{
              marginTop: '1.7em',
              color: 'red',
              fontWeight: 'bolder',
            }}
          >
            Out of stock
          </p>
        ) : (
          <p
            style={{
              marginTop: '1.7em',
              color: 'green',
              fontWeight: 'bolder',
            }}
          >
            In stock
          </p>
        )}
        <div style={{ marginTop: '1em' }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={quantity}
              label="Quantity"
              onChange={handleQuantity}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
            </Select>
          </FormControl>

          {add && <p className="addcart_alert">{alertContent}</p>}
          <div style={{ width: '20em', margin: '1em auto' }}>
            {isAlert && (
              <Alert
                style={{ margin: '1em', width: '20em' }}
                severity={alertContent?.variant}
              >
                {alertContent?.content}
              </Alert>
            )}
            <Button
              startIcon={<AddShoppingCartIcon />}
              style={{
                backgroundColor: 'green',
                width: '20em',
              }}
              variant="contained"
              onClick={() => addcart()}
            >
              Add to cart
            </Button>
          </div>
          <div style={{ width: '20em', margin: '1em auto' }}>
            <Button
              startIcon={<FavoriteIcon />}
              style={{
                backgroundColor: 'red',
                width: '20em',
              }}
              variant="contained"
              onClick={() => addToWish()}
            >
              Add to wish list
            </Button>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div style={{ marginTop: '15em' }}>
      <CircularProgress />
    </div>
  );
};
