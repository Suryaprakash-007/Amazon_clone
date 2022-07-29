import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { updateUserInfo } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

export default function WishListCard({ imgUrl, name, id, setIsAlert }) {
  // Cookie reviever from browser
  const [cookie, setCookie] = useCookies(['user']);
  // Key data from cookie
  var { key } = cookie;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get wish list from store
  const wishList = useSelector((state) => state.userInfo.userList.wishList);
  // User ID from store
  const userId = useSelector((state) => state.userInfo.userList._id);

  // Fundtion to remove product from favorite
  const handleFav = async () => {
    const wishReq = await fetch('http://localhost:3002/api/updateWishList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
        userId,
        id,
        wishList,
      }),
    });
    const wishRes = await wishReq.json();
    dispatch(updateUserInfo(wishRes.data));
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 2000);
  };

  useEffect(() => {}, [wishList]);

  return (
    <Card sx={{ maxWidth: 345, margin: '1em auto' }}>
      <Tooltip title={'Click here to view'}>
        <div
          onClick={() => navigate(`/productView/${id}`)}
          style={{ margin: '1em', cursor: 'pointer' }}
        >
          <img src={imgUrl} alt="Product" height={'140px'} />
        </div>
      </Tooltip>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={() => handleFav()} aria-label="add to favorites">
          <FavoriteIcon color="warning" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
