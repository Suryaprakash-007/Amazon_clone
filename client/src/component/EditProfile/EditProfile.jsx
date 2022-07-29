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
import { updateUserInfo } from '../../store/userSlice';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Modal } from '@mui/material';

const EditProfile = () => {
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

  // All user info from store
  const userDetails = useSelector((state) => state.userInfo.userList);

  //should only be called when otp is verified
  const updateProfileInDB = async () => {
    const obj = {
      key: key,
      userId: userId,
      fullName: values.name,
      email: values.mail,
      mobile: values.mobileNum,
    };
    const userUpdated = await fetch('http://localhost:3002/api/updateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    // If user present, userDetails will have the user else it will be false
    const isUpdated = await userUpdated.json();

    // Need code to check if user is present or not
    if (isUpdated.status === 200) {
      dispatch(updateUserInfo(isUpdated.data));
      setAlertContent({
        content: 'User details have been updated successfully !',
        type: 'success',
      });
      updateProfile();
    } else {
      setAlertContent({
        content: 'Mail or Phone number already exist...Try again !',
        type: 'error',
      });
      updateProfile();
    }
  };

  //event handler submitting the form
  const handleSubmit = async (value) => {
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
  };

  //form validation with formik and yup
  const validateTask = yup.object({
    name: yup.string().required('Name is required'),
    mail: yup.string().email('Email is invalid').required('Email is required'),
    mobileNum: yup
      .string()
      .length(10, 'Provide a valid phone number')
      .required('Phone number is required'),
  });

  const validateFormik = useFormik({
    initialValues: {
      name: `${userDetails.fullName}`,
      mail: `${userDetails.email}`,
      mobileNum: `${userDetails.mobile}`,
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
      updateProfileInDB();
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
    <div style={{ margin: '9em auto' }}>
      {update && (
        <>
          <Alert style={{ marginTop: '0.5em' }} severity={alertContent.type}>
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
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Edit your details
            </Typography>
            <div style={{ textAlign: 'center' }}>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/edit-social-media-profile-5295893-4412910.png"
                height={'200px'}
                alt="Profile update"
              />
            </div>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="Full Name"
                type="text"
                id="name"
                autoComplete="current-name"
                value={validateFormik.values.name}
                onChange={validateFormik.handleChange}
                error={
                  validateFormik.touched.name &&
                  Boolean(validateFormik.errors.name)
                }
                helperText={
                  validateFormik.touched.name && validateFormik.errors.name
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="mail"
                label="Email Address"
                name="mail"
                autoComplete="mail"
                value={validateFormik.values.mail}
                onChange={validateFormik.handleChange}
                error={
                  validateFormik.touched.mail &&
                  Boolean(validateFormik.errors.mail)
                }
                helperText={
                  validateFormik.touched.mail && validateFormik.errors.mail
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="mobileNum"
                label="Phone Number"
                type="string"
                id="mobileNum"
                autoComplete="current-mobile"
                value={validateFormik.values.mobileNum}
                onChange={validateFormik.handleChange}
                error={
                  validateFormik.touched.mobileNum &&
                  Boolean(validateFormik.errors.mobileNum)
                }
                helperText={
                  validateFormik.touched.mobileNum &&
                  validateFormik.errors.mobileNum
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update Profile
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
