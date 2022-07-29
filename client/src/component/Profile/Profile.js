import './Profile.css';
import { Button, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Profile = () => {
  const navigate = useNavigate();
  const fullName = useSelector((state) => {
    return state.userInfo.userList.fullName;
  });

  useEffect(() => {}, [fullName]);

  return (
    <div
      style={{
        textAlign: 'center',
        height: '80vh',
        marginBottom: '10em',
        marginTop: '4em',
      }}
    >
      <div className="profileNameImg">
        <PersonOutlineIcon
          style={{
            margin: '1em',
            border: '2px solid',
            borderRadius: '50%',
            width: '2em',
            height: '2em',
          }}
          fontSize="large"
        />
        <h2>Welcome {fullName}</h2>
      </div>

      <Grid style={{ marginTop: '3em' }} container spacing={3}>
        <Grid item xs={12}>
          <Button
            onClick={() => navigate('/orderHistory')}
            variant={'contained'}
            style={{
              backgroundColor: 'GrayText',
              borderRadius: '40em',
            }}
          >
            Order History
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant={'contained'}
            style={{
              backgroundColor: 'GrayText',
              borderRadius: '40em',
            }}
            onClick={() => navigate('/editProfile')}
          >
            Edit your profile
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant={'contained'}
            style={{
              backgroundColor: 'GrayText',
              borderRadius: '40em',
            }}
            onClick={() => navigate('/changePassword')}
          >
            Change your passowrd
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant={'contained'}
            style={{
              backgroundColor: 'GrayText',
              borderRadius: '40em',
            }}
            onClick={() => navigate('/wishList')}
          >
            Wish List
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
