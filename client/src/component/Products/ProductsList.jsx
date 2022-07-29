import React, { useEffect, useState } from 'react';
import './card.css';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import Container from 'react-bootstrap/esm/Container';

const ProductsList = ({ products, bannerUrl, category }) => {
  const navigate = useNavigate();
  const [ProductsList, setProductsList] = useState(products);
  const [priceFilter, setPriceFilter] = useState('1000');

  let date = new Date().toUTCString().slice(0, 16);

  const getRating = (rating) => {
    switch (rating) {
      case 2:
        return '⭐⭐';
      case 3:
        return '⭐⭐⭐';
      case 4:
        return '⭐⭐⭐⭐';
      case 5:
        return '⭐⭐⭐⭐⭐';
      default:
        return '⭐';
    }
  };

  const CardCustom = ({ id, imgUrl, name, price, rate, count }) => {
    return (
      <div
        className="card shadow-lg"
        onClick={() => navigate(`/productView/${id}`)}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <img
            style={{ textAlign: 'center' }}
            src={imgUrl}
            alt={'product pic'}
            height={'160px'}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title mb-3">{name}</h5>
          <div style={{ display: 'flex' }}>
            <p>{getRating(Math.round(rate))}</p>
            <p className="card_rating_count">({count})</p>
          </div>
          <h6 className="mb-3">${price}</h6>
          <p className="card_delivery">
            Get it by <strong>{date}</strong>
          </p>
          <p className="delivery_charge">FREE Delivery by Amazon</p>
        </div>
      </div>
    );
  };

  const handleChange = (e) => {
    setPriceFilter(e.target.value);
  };

  // value indicator in slider bar
  const marks = [
    {
      value: 10,
      label: '$10',
    },
    {
      value: 1000,
      label: '$1000',
    },
  ];

  useEffect(() => {
    const filteredList = products.filter(
      (i) => i.category === category && i.price <= priceFilter
    );
    setProductsList(filteredList);
  }, [priceFilter, category]);

  return (
    <div style={{ marginTop: '5.7em' }} className="product_display_bg">
      <img className="banner__mobiles" src={bannerUrl} alt="Mobile Banner" />
      <div style={{ width: '70%', margin: '1em auto' }}>
        <p style={{ marginBottom: '0.5em' }}>Filter by price</p>
        <Slider
          aria-label="Temperature"
          defaultValue={1000}
          valueLabelDisplay="auto"
          step={10}
          marks={marks}
          min={10}
          max={1000}
          onChange={handleChange}
        />
      </div>
      <Container fluid>
        <Grid
          style={{ marginBottom: '1em' }}
          container
          spacing={4}
          alignItems="center"
          justifyContent={'center'}
        >
          {ProductsList.length > 0 &&
            ProductsList.map((item, i) => {
              return (
                <Grid item key={i} xs={12} md={6}>
                  <CardCustom
                    imgUrl={item.imgUrl}
                    price={item.price}
                    rate={item.rating.rate}
                    name={item.name}
                    count={item.rating.count}
                    id={item.id}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
};

export default ProductsList;
