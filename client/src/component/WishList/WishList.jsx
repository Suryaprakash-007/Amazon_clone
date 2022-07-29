import React from 'react';
import { useSelector } from 'react-redux';
import WishListCard from './WishListCard';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';

const WishList = () => {
  // State for alert
  const [isAlert, setIsAlert] = useState(false);

  // Wish List fron the store
  const wishList = useSelector((state) => state.userInfo.userList.wishList);

  useEffect(() => {}, [wishList]);

  return wishList.length > 0 ? (
    <div style={{ marginTop: '8em' }}>
      <h2 style={{ marginLeft: '1em' }}>Your wish list</h2>
      {isAlert && (
        <Alert style={{ margin: '1em auto', width: '20em' }} severity="error">
          Product removed from wish list !
        </Alert>
      )}
      <Grid
        container
        textAlign={'center'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={2}
      >
        {wishList.map((i, j) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={j}>
              <WishListCard
                setIsAlert={setIsAlert}
                imgUrl={i.imgUrl}
                name={i.name}
                id={i.id}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  ) : (
    <div style={{ marginTop: '10em' }}>
      <div style={{ margin: '4em 0 14em 0', textAlign: 'center' }}>
        <img
          src="https://faconn.com/wp-content/uploads/2022/03/EXAM360-No-Wishlist.png"
          height={'300px'}
          alt="WishList Empty"
        />
      </div>
    </div>
  );
};

export default WishList;
