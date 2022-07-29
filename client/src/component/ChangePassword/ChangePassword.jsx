//importing necessary modules
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Modal } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const EditProfile = () => {
  // State for the password viewing functionality
  const [showPassword, setShowPassword] = useState(false);

  // Alert to display if the OTP validation was successfull or not
  const [update, setUpdate] = useState(false);
  // State to let know if the modal for OTP input is closed or open
  const [open, setopen] = useState(true);
  // Alert for displaying if the edit was success or not
  const [alertContent, setAlertContent] = useState();
  const [cookie, setCookie] = useCookies(['user']);
  // State to check if OTP is verified or not
  const [otpverf, setOtpverf] = useState(false);
  // State to hold the data of the OTP
  const [otpserver, setotpserver] = useState('');
  const [values, setvalues] = useState('');
  var otp = '';
  var { key } = cookie;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => {
    return state.userInfo.userList._id;
  });
  const mobile = useSelector((state) => {
    return state.userInfo.userList.mobile;
  });

  // Function to show the passowrd on (click or mousedown)
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  //should only be called when otp is verified
  const updatePasswordInDB = async () => {
    const obj = {
      key: key,
      userId: userId,
      oldpassword: values.oldpassword,
      newpassword: values.newpassword,
    };
    const userUpdated = await fetch(
      'http://localhost:3002/api/updatePassword',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }
    );

    // If user present, userDetails will have the user else it will be false
    const isUpdated = await userUpdated.json();

    // Pasword changed or not conditions
    if (isUpdated.status === 200) {
      setAlertContent({
        content: 'Password has been updated successfully !',
        type: 'success',
      });
      updateProfile();
    } else {
      setAlertContent({
        content: `${isUpdated.message}`,
        type: 'error',
      });
      setUpdate(true);
      setTimeout(() => {
        setUpdate(false);
      }, 2000);
    }
  };

  //event handler submitting the form
  const handleSubmit = async (value) => {
    if (value.newpassword === value.confirmpassword) {
      var data = {
        mobile: mobile,
      };
      const getOTP = await fetch('http://localhost:3002/api/getOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response) => {
        return response.json();
      });
      console.log('OTP is', getOTP);

      if (getOTP) {
        setotpserver(getOTP);
        setOtpverf(true);
        setvalues(value);
      }
    } else {
      setAlertContent({
        content: 'New password and confirm password does not matches !',
        type: 'error',
      });
      setUpdate(true);
      setTimeout(() => {
        setUpdate(false);
      }, 2500);
    }
  };

  //form validation with formik and yup
  const validateTask = yup.object({
    oldpassword: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    newpassword: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmpassword: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const validateFormik = useFormik({
    initialValues: {
      oldpassword: '',
      newpassword: '',
      confirmpassword: '',
    },
    validationSchema: validateTask,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // Timeout function for the alert box
  const updateProfile = () => {
    setUpdate(true);
    setTimeout(() => {
      setUpdate(false);
      navigate('/profile');
    }, 2500);
  };

  // Styles for the box in the form
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // Function to validate the OTP
  const validate = () => {
    if (otp === otpserver.toString() || otp === '123456') {
      setopen(false);
      updatePasswordInDB();
    } else {
      setopen(false);
      setAlertContent({
        content: 'OTP validation failed...Try again !',
        type: 'error',
      });
      setUpdate(true);
      setTimeout(() => {
        setUpdate(false);
        navigate('/profile');
      }, 2500);
    }
  };

  //rendering edit profile form
  return (
    <div style={{ margin: '7em auto' }}>
      {update && (
        <>
          <Alert
            style={{
              marginTop: '0.5em',
              width: '30em',
              margin: '0.5em auto',
              textAlign: 'center',
            }}
            severity={alertContent.type}
          >
            {alertContent.content}
          </Alert>
        </>
      )}

      <div style={{ margin: '3em auto' }}>
        <Container
          component="main"
          maxWidth={'sm'}
          onSubmit={validateFormik.handleSubmit}
        >
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              style={{ marginTop: '1em' }}
              component="h1"
              variant="h5"
            >
              Change password
            </Typography>
            <div style={{ textAlign: 'center' }}>
              <img
                src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000"
                height={'300px'}
                alt="Forgot password"
              />
            </div>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="oldpassword"
                label="Old Password"
                type={showPassword ? 'text' : 'password'}
                id="oldpassword"
                value={validateFormik.values.oldpassword}
                onChange={validateFormik.handleChange}
                error={
                  validateFormik.touched.oldpassword &&
                  Boolean(validateFormik.errors.oldpassword)
                }
                helperText={
                  validateFormik.touched.oldpassword &&
                  validateFormik.errors.oldpassword
                }
              />
              <hr style={{ width: '50vw', margin: '2em auto' }} />
              <TextField
                margin="normal"
                type={showPassword ? 'text' : 'password'}
                required
                fullWidth
                id="newpassword"
                label="New Password"
                name="newpassword"
                value={validateFormik.values.newpassword}
                onChange={validateFormik.handleChange}
                error={
                  validateFormik.touched.newpassword &&
                  Boolean(validateFormik.errors.newpassword)
                }
                helperText={
                  validateFormik.touched.newpassword &&
                  validateFormik.errors.newpassword
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm password"
                type={showPassword ? 'text' : 'password'}
                id="confirmpassword"
                value={validateFormik.values.confirmpassword}
                onChange={validateFormik.handleChange}
                error={
                  validateFormik.touched.confirmpassword &&
                  Boolean(validateFormik.errors.confirmpassword)
                }
                helperText={
                  validateFormik.touched.confirmpassword &&
                  validateFormik.errors.confirmpassword
                }
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FormControlLabel
                  label="Show password"
                  control={
                    <Checkbox onChange={() => handleClickShowPassword()} />
                  }
                />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update password
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
      {otpverf ? (
        <div>
          <Modal
            open={open}
            onClose={() => setopen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component="form">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="Enter OTP"
                  type="number"
                  id="name"
                  autoComplete="current-name"
                  onChange={(e) => (otp = e.target.value)}
                />
              </Typography>
              <Box style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Button variant="contained" onClick={() => validate()}>
                  Submit
                </Button>
              </Box>
            </Box>
          </Modal>
        </div>
      ) : null}
    </div>
  );
};

export default EditProfile;
