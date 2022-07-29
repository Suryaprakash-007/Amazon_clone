import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Paper } from '@mui/material';
import DealsOfDay from '../DealsOfDay/DealsOfDay';
import './Home.css';
import Grid from '@mui/material/Grid';
import { Container } from 'react-bootstrap';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
// Importing all the static images
import Carousal1 from '../../images/Carousal1.jpg';
import Carousal2 from '../../images/Carousal2.jpg';
import Carousal3 from '../../images/Carousal3.jpg';
import Carousal4 from '../../images/Carousal4.jpg';
import Carousal5 from '../../images/Carousal5.png';
import Carousal6 from '../../images/Carousal6.jpg';

const items = [
  {
    imageUrl: `${Carousal1}`,
  },
  {
    imageUrl: `${Carousal2}`,
  },
  {
    imageUrl: `${Carousal3}`,
  },
  {
    imageUrl: `${Carousal4}`,
  },
  {
    imageUrl: `${Carousal5}`,
  },
  {
    imageUrl: `${Carousal6}`,
  },
];

function Item(props) {
  return (
    <Paper>
      <div
        className="carousel"
        style={{
          backgroundImage: `url(${props.item.imageUrl})`,
        }}
      ></div>
    </Paper>
  );
}

const Home = ({ products }) => {
  const navigate = useNavigate();
  const dealsProduct = products?.filter((item) => item.todayDeal === true);

  const offersProduct = products?.filter((item) => item.offerForYou === true);

  const [input, setInput] = useState('');
  const inputhandler = (e) => {
    var query = e.target.value.toLowerCase();
    setInput(query);
  };

  return (
    <div style={{ marginTop: '6.5em' }}>
      <Carousel autoPlay={true}>
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>

      <div style={{ marginTop: '2em' }} className="background_effect">
        {/* {UI lika amazon} */}
        <Container fluid className="main_container">
          <Grid container spacing={3}>
            <Grid style={{ margin: '0 auto' }} item md={4}>
              <Card
                sx={{
                  height: '100%',
                  padding: '0.7em',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  style={{ fontWeight: 'bold' }}
                >
                  Smart TV
                </Typography>
                <CardMedia
                  component="img"
                  style={{ height: '20em' }}
                  image={
                    'https://www.globalbrandsmagazine.com/wp-content/uploads/2021/10/GSS-TV-Shopping.jpg'
                  }
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}></CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      navigate('/tv');
                    }}
                    size="small"
                  >
                    Explore all
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid style={{ margin: '0 auto' }} item md={4}>
              <Card
                sx={{
                  height: '100%',
                  padding: '0.7em',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  style={{ fontWeight: 'bold' }}
                >
                  Kitchen Appliances
                </Typography>
                <Grid
                  style={{ height: '18em', textAlign: 'center' }}
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={
                        'https://m.media-amazon.com/images/I/61Rd3DgH5cL._SL1500_.jpg'
                      }
                      alt="random"
                      onClick={() => navigate('/tv')}
                    /> */}
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://m.media-amazon.com/images/I/61Rd3DgH5cL._SL1500_.jpg"
                        alt="Toaster"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    <Typography gutterBottom>Toaster</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://images.philips.com/is/image/philipsconsumer/72dbb6e1509a4cacb631ad1900d54b9e?wid=420&hei=360&$jpglarge$"
                        alt="Expresso"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={
                        'https://images.philips.com/is/image/philipsconsumer/72dbb6e1509a4cacb631ad1900d54b9e?wid=420&hei=360&$jpglarge$'
                      }
                      alt="random"
                      onClick={() => navigate('/home')}
                    /> */}
                    <Typography gutterBottom>Expresso Maker</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://www.ikea.com/in/en/images/products/pruta-food-container-set-of-17-transparent-green__0711382_pe728174_s5.jpg?f=s"
                        alt="Food Container"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={Home4}
                      alt="random"
                      onClick={() => navigate('/furniture')}
                    /> */}
                    <Typography gutterBottom>Food Containers</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://m.media-amazon.com/images/I/51KGrhhnkvS._SL1100_.jpg"
                        alt="Mixer"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={Home5}
                      alt="random"
                      onClick={() => navigate('/kitchen')}
                    /> */}
                    <Typography gutterBottom>Juice Mixer</Typography>
                  </Grid>
                </Grid>
                <CardActions style={{ marginTop: '4em' }}>
                  <Button
                    onClick={() => navigate('/kitchenAppliances')}
                    size="small"
                  >
                    View more
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid style={{ margin: '0 auto' }} item md={4}>
              <Card
                sx={{
                  height: '100%',
                  padding: '0.7em',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  style={{ fontWeight: 'bold' }}
                >
                  Furniture
                </Typography>
                <CardMedia
                  component="img"
                  style={{ height: '20em' }}
                  image={
                    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/posters-in-cozy-apartment-interior-royalty-free-image-943910360-1534189931.jpg'
                  }
                  alt="furniture"
                />
                <CardContent sx={{ flexGrow: 1 }}></CardContent>
                <CardActions>
                  <Button onClick={() => navigate('/furniture')} size="small">
                    See more
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid style={{ margin: '0 auto' }} item md={4}>
              <Card
                sx={{
                  height: '100%',
                  padding: '0.7em',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  style={{ fontWeight: 'bold' }}
                >
                  Home Appliances
                </Typography>
                <Grid
                  style={{ height: '18em', textAlign: 'center' }}
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={
                        'https://m.media-amazon.com/images/I/61Rd3DgH5cL._SL1500_.jpg'
                      }
                      alt="random"
                      onClick={() => navigate('/tv')}
                    /> */}
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://pro.sony/s3/2019/02/24142720/Home_Cinema_Projectors_projector.png"
                        alt="Projector"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    <Typography gutterBottom>Cimema projector</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://5.imimg.com/data5/UM/WL/CW/SELLER-97821727/home-theatre-system-500x500.jpg"
                        alt="Home Theatre"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={
                        'https://images.philips.com/is/image/philipsconsumer/72dbb6e1509a4cacb631ad1900d54b9e?wid=420&hei=360&$jpglarge$'
                      }
                      alt="random"
                      onClick={() => navigate('/home')}
                    /> */}
                    <Typography gutterBottom>Bluetooth speakers</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://m.media-amazon.com/images/I/71Y3lsKoFUL._SL1500_.jpg"
                        alt="Lights"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={Home4}
                      alt="random"
                      onClick={() => navigate('/furniture')}
                    /> */}
                    <Typography gutterBottom>LED bulb</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://m.media-amazon.com/images/I/51lDTVE9-jL._SL1300_.jpg"
                        alt="Bell"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={Home5}
                      alt="random"
                      onClick={() => navigate('/kitchen')}
                    /> */}
                    <Typography gutterBottom>Calling bell</Typography>
                  </Grid>
                </Grid>
                <CardActions style={{ marginTop: '4em' }}>
                  <Button
                    onClick={() => navigate('/homeAppliances')}
                    size="small"
                  >
                    View more
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid style={{ margin: '0 auto' }} item md={4}>
              <Card
                sx={{
                  height: '100%',
                  padding: '0.7em',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  style={{ fontWeight: 'bold' }}
                >
                  Jewels
                </Typography>
                <CardMedia
                  component="img"
                  style={{ height: '20em' }}
                  image={
                    'https://ecommercechinaagency.com/wp-content/uploads/2017/05/jewellery-2.jpg'
                  }
                  alt="Jewels"
                />
                <CardContent sx={{ flexGrow: 1 }}></CardContent>
                <CardActions>
                  <Button onClick={() => navigate('/jwellery')} size="small">
                    Shop now
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid style={{ margin: '0 auto' }} item md={4}>
              <Card
                sx={{
                  height: '100%',
                  padding: '0.7em',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  style={{ fontWeight: 'bold' }}
                >
                  Helmet
                </Typography>
                <Grid
                  style={{ height: '18em', textAlign: 'center' }}
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={
                        'https://m.media-amazon.com/images/I/61Rd3DgH5cL._SL1500_.jpg'
                      }
                      alt="random"
                      onClick={() => navigate('/tv')}
                    /> */}
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://5.imimg.com/data5/SELLER/Default/2021/9/LN/HD/EM/20506059/e-commerce-helmet-photography-500x500.JPG"
                        alt="HalfHead"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    <Typography gutterBottom>Half-Head Helmet</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://i.pinimg.com/736x/ac/d5/ba/acd5bad570a79a76342f33c329c0ed81--ecommerce-store-motocross.jpg"
                        alt="Styled Helmet"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={
                        'https://images.philips.com/is/image/philipsconsumer/72dbb6e1509a4cacb631ad1900d54b9e?wid=420&hei=360&$jpglarge$'
                      }
                      alt="random"
                      onClick={() => navigate('/home')}
                    /> */}
                    <Typography gutterBottom>Styled Helmet</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://img.joomcdn.net/52bc20b2ade34eea713424ec16569bee674f93d3_original.jpeg"
                        alt="Scooty helmet"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={Home4}
                      alt="random"
                      onClick={() => navigate('/furniture')}
                    /> */}
                    <Typography gutterBottom>Scooty Helmet</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://n3.sdlcdn.com/imgs/a/k/1/Lazer-SMX-Dirty-Helmet-Orange-SDL431005685-1-d2d8b.jpg"
                        alt="Sports Helmet"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={Home5}
                      alt="random"
                      onClick={() => navigate('/kitchen')}
                    /> */}
                    <Typography gutterBottom>Sports Helmet</Typography>
                  </Grid>
                </Grid>
                <CardActions style={{ marginTop: '4em' }}>
                  <Button onClick={() => navigate('/helmet')} size="small">
                    View more
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid style={{ margin: '0 auto' }} item md={4}>
              <Card
                sx={{
                  height: '100%',
                  padding: '0.7em',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  style={{ fontWeight: 'bold' }}
                >
                  Daily Essential
                </Typography>
                <Grid
                  style={{ height: '18em', textAlign: 'center' }}
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={
                        'https://m.media-amazon.com/images/I/61Rd3DgH5cL._SL1500_.jpg'
                      }
                      alt="random"
                      onClick={() => navigate('/tv')}
                    /> */}
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://5.imimg.com/data5/SELLER/Default/2021/12/BW/MZ/WC/83186876/neutrogena-men-invigorating-face-wash-500x500.png"
                        alt="Face Wash"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    <Typography gutterBottom>Face Wash</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://kitestudio.co/pinkmart-demo5/wp-content/uploads/sites/8/2019/04/Cover-11.jpg"
                        alt="Shampoo"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={
                        'https://images.philips.com/is/image/philipsconsumer/72dbb6e1509a4cacb631ad1900d54b9e?wid=420&hei=360&$jpglarge$'
                      }
                      alt="random"
                      onClick={() => navigate('/home')}
                    /> */}
                    <Typography gutterBottom>Shampoo</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://5.imimg.com/data5/MR/JF/MY-46407137/st-d-venc-body-moisturiser-winter-edition-for-very-dry-skin-500x500.jpg"
                        alt="Moisturiser"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={Home4}
                      alt="random"
                      onClick={() => navigate('/furniture')}
                    /> */}
                    <Typography gutterBottom>Moisturiser</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://blog.boldcommerce.com/hubfs/13-ecommerce-profitable-products.jpg"
                        alt="Beard Oil"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={Home5}
                      alt="random"
                      onClick={() => navigate('/kitchen')}
                    /> */}
                    <Typography gutterBottom>Beard Oil</Typography>
                  </Grid>
                </Grid>
                <CardActions style={{ marginTop: '4em' }}>
                  <Button onClick={() => navigate('/daily')} size="small">
                    View more
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid style={{ margin: '0 auto' }} item md={4}>
              <Card
                sx={{
                  height: '100%',
                  padding: '0.7em',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  style={{ fontWeight: 'bold' }}
                >
                  Cleaning essentials
                </Typography>
                <CardMedia
                  component="img"
                  style={{ height: '20em' }}
                  image={
                    'https://www.swifterm.com/wp-content/uploads/2022/03/Data-quality-essential-for-ecommerce-1.png'
                  }
                  alt="Cleaning Products"
                />
                <CardContent sx={{ flexGrow: 1 }}></CardContent>
                <CardActions>
                  <Button onClick={() => navigate('/cleaning')} size="small">
                    Shop now
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid style={{ margin: '0 auto' }} item md={4}>
              <Card
                sx={{
                  height: '100%',
                  padding: '0.7em',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  style={{ fontWeight: 'bold' }}
                >
                  Automobile Accessories
                </Typography>
                <Grid
                  style={{ height: '18em', textAlign: 'center' }}
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={
                        'https://m.media-amazon.com/images/I/61Rd3DgH5cL._SL1500_.jpg'
                      }
                      alt="random"
                      onClick={() => navigate('/tv')}
                    /> */}
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://5.imimg.com/data5/IW/AP/QD/SELLER-18364713/jeep-steel-rim-5-pieces--500x500.jpeg"
                        alt="Tyre Rim"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    <Typography gutterBottom>Tyre Rim</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://cdn.moglix.com/p/7aj5Z3nZojxvU-large.jpg"
                        alt="Tyre"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={
                        'https://images.philips.com/is/image/philipsconsumer/72dbb6e1509a4cacb631ad1900d54b9e?wid=420&hei=360&$jpglarge$'
                      }
                      alt="random"
                      onClick={() => navigate('/home')}
                    /> */}
                    <Typography gutterBottom>Tyre</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://cdn.moglix.com/p/0ntrFhjjrW25C-large.jpg"
                        alt="Rim Cover"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={Home4}
                      alt="random"
                      onClick={() => navigate('/furniture')}
                    /> */}
                    <Typography gutterBottom>Rim cover</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="https://5.imimg.com/data5/EQ/BQ/WH/SELLER-100844202/electric-mini-dc-12v-air-compressor-pump-for-car-and-bike-tyre-tire-inflator-500x500.jpg"
                        alt="Beard Oil"
                        width={'140px'}
                        height={'140px'}
                      />
                    </div>
                    {/* <CardMedia
                      component="img"
                      style={{ height: '8em' }}
                      image={Home5}
                      alt="random"
                      onClick={() => navigate('/kitchen')}
                    /> */}
                    <Typography gutterBottom>Air compressor</Typography>
                  </Grid>
                </Grid>
                <CardActions style={{ marginTop: '4em' }}>
                  <Button onClick={() => navigate('/tyre')} size="small">
                    View more
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
      {/* Deals of the day Component */}
      <DealsOfDay
        title={`Deal of the day`}
        productArr={dealsProduct}
        tagLine={`For you`}
      />
      {/* Offers for you component */}
      <DealsOfDay
        title={`Offer's just for you`}
        productArr={offersProduct}
        tagLine={`For you`}
      />
    </div>
  );
};

export default Home;
