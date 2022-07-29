import React from 'react';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ name, imgUrl, offer, price, tagLine, id }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Paper
        className="product__card shadow-lg"
        onClick={() => navigate(`/productView/${id}`)}
      >
        <img
          style={{ cursor: 'pointer' }}
          src={imgUrl}
          alt="Product"
          height={'140px'}
        />
        <h3
          style={{
            marginTop: '1em',
            fontFamily: 'monospace',
            fontWeight: 'bolder',
            fontSize: '1em',
          }}
        >
          {name}
        </h3>
        <h6 style={{ textAlign: 'left', marginLeft: '1em' }}>
          <span
            style={{
              backgroundColor: 'red',
              color: 'white',
              marginRight: '0.5em',
              padding: '0 1%',
            }}
          >
            {offer}%
          </span>
          {tagLine}
        </h6>
        <h3
          style={{
            textAlign: 'left',
            marginLeft: '1em',
            fontSize: '1.3em',
          }}
        >
          ${price}
        </h3>
      </Paper>
    </div>
  );
};

export default ProductCard;
