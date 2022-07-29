//importing various packages
import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { updateProducts } from './store/productsSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductView } from './component/product_view/productView';
import LinearProgress from '@mui/material/LinearProgress';
import Footer from './component/Footer/Footer';
import Header from './component/Header/Header';
import Home from './component/Home/Home';
import ProductsList from './component/Products/ProductsList';
import SignIn from './component/SignIn/SignIn';
import Register from './component/Register/register';
import Cart from './component/Cart/Cart';
import Profile from './component/Profile/Profile';
import OrderHistory from './component/OrderHistory/OrderHistory';
import EditProfile from './component/EditProfile/EditProfile';
import Checkout from './component/checkout/checkout/Checkout';
import ErrorPage from './component/errorpage/ErrorPage.jsx';
import { useCookies } from 'react-cookie';
import { logOffUser } from './store/userSlice';
import ChangePassword from './component/ChangePassword/ChangePassword';
import WishList from './component/WishList/WishList';

//App component
const App = () => {
  //variables
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsList.products);
  const loggedin = useSelector((state) => state.userInfo.isLogged);
  const [cookies, setCookies] = useCookies(['user']);

  //fetching products from database
  useEffect(() => {
    const { key } = cookies;
    if (!key) {
      dispatch(logOffUser());
    }

    const updateProduct = async () => {
      const data = await fetch('http://localhost:3002/api/getProducts');
      const res = await data.json();

      dispatch(updateProducts({ res }));
    };
    updateProduct();
  }, []);

  //routes are described below
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Header />
                  <Home products={products} />
                  <Footer pos={''} />
                </div>
              }
            />
            <Route
              path="wishList"
              element={
                <div>
                  <Header />
                  {loggedin ? <WishList /> : <Home />}
                  <Footer pos={''} />
                </div>
              }
            />
            <Route
              path="signin"
              element={
                <div>
                  <SignIn />
                </div>
              }
            />
            <Route
              path="register"
              element={
                <div>
                  <Register />
                </div>
              }
            />
            <Route
              path="cart"
              element={
                <div>
                  <Header />
                  {loggedin ? <Cart /> : <Home />}
                  <Footer pos={'bottom'} />
                </div>
              }
            />
            <Route
              path="tv"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`TV`}
                    bannerUrl={
                      'https://i.pinimg.com/originals/bd/4b/d1/bd4bd1c3a5373e3044077f7c29dd2974.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />
            <Route
              path="kitchenAppliances"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`Kitchen Appliance`}
                    bannerUrl={
                      'http://cdn.shopify.com/s/files/1/0494/0761/collections/Kitchen-banner_1024x1024.jpg?v=1406640384'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />
            <Route
              path="furniture"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`furniture`}
                    bannerUrl={
                      'https://indiater.com/wp-content/uploads/2021/09/furniture-and-interior-detail-store-promotion-sale-ads-banner-on-yellow-floor-and-background-1024x395.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />
            <Route
              path="homeAppliances"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`Home`}
                    bannerUrl={
                      'https://www.gaayan.com/wp-content/uploads/2019/11/sangeeta-bisht-sangeeta-bisht-home-appliance-service-banner.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />
            <Route
              path="electronic"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={'electronics'}
                    bannerUrl={
                      'https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/ElectronicsStore/GW/New/1242x450.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />
            <Route
              path="mensClothing"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`men's clothing`}
                    bannerUrl={
                      'https://images-eu.ssl-images-amazon.com/images/G/31/img18/apparel/Events/formal-fest/Brands/Amazon-Exclusive-Styles-cat-mob-770300.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />
            <Route
              path="womensClothing"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`women's clothing`}
                    bannerUrl={
                      'https://images-na.ssl-images-amazon.com/images/G/31/img2020/fashion/WA_2020/christmasStore/christmastopbanner._CB413369871_.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />
            <Route
              path="daily"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`Daily`}
                    bannerUrl={
                      'https://www.sarauae.com/files/2019/09/hair-care-banner.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />
            <Route
              path="helmet"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`Helmet`}
                    bannerUrl={
                      'https://www.bilmola.com/wp-content/uploads/2021/02/banner-image-slider-veloce.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />
            <Route
              path="cleaning"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`cleaning`}
                    bannerUrl={
                      'https://www.qfc.com/content/v2/binary/image/hometips/spring-cleaning_bottom-espot-desktop-1582751965282.png'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />
            <Route
              path="tyre"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`Tyrerim`}
                    bannerUrl={
                      'https://as1.ftcdn.net/v2/jpg/03/41/79/04/1000_F_341790400_dQmYianNGDNExL7aHH5Q2XwskeCd7jka.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />
            <Route
              path="jwellery"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`jewelery`}
                    bannerUrl={
                      'https://images-eu.ssl-images-amazon.com/images/G/31/IN-hq/2018/img/Jewelry/XCM_Manual_1123727_brand_770x300_Jewelry_banner_770x300_jpg.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />

            <Route
              path="/tv"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`TV`}
                    bannerUrl={
                      'https://images-eu.ssl-images-amazon.com/images/G/31/IN-hq/2018/img/Jewelry/XCM_Manual_1123727_brand_770x300_Jewelry_banner_770x300_jpg.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />

            <Route
              path="/kitchen"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`Kitchen Appliance`}
                    bannerUrl={
                      'https://images-eu.ssl-images-amazon.com/images/G/31/IN-hq/2018/img/Jewelry/XCM_Manual_1123727_brand_770x300_Jewelry_banner_770x300_jpg.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />

            <Route
              path="/furniture"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`furniture`}
                    bannerUrl={
                      'https://images-eu.ssl-images-amazon.com/images/G/31/IN-hq/2018/img/Jewelry/XCM_Manual_1123727_brand_770x300_Jewelry_banner_770x300_jpg.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />

            <Route
              path="/home"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`Home`}
                    bannerUrl={
                      'https://images-eu.ssl-images-amazon.com/images/G/31/IN-hq/2018/img/Jewelry/XCM_Manual_1123727_brand_770x300_Jewelry_banner_770x300_jpg.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />

            <Route
              path="/daily"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`Daily`}
                    bannerUrl={
                      'https://images-eu.ssl-images-amazon.com/images/G/31/IN-hq/2018/img/Jewelry/XCM_Manual_1123727_brand_770x300_Jewelry_banner_770x300_jpg.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />

            <Route
              path="/cleaning"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`cleaning`}
                    bannerUrl={
                      'https://images-eu.ssl-images-amazon.com/images/G/31/IN-hq/2018/img/Jewelry/XCM_Manual_1123727_brand_770x300_Jewelry_banner_770x300_jpg.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />

            <Route
              path="/tyre"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`Tyrerim`}
                    bannerUrl={
                      'https://images-eu.ssl-images-amazon.com/images/G/31/IN-hq/2018/img/Jewelry/XCM_Manual_1123727_brand_770x300_Jewelry_banner_770x300_jpg.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />

            <Route
              path="/helmet"
              element={
                <div>
                  <Header />
                  <ProductsList
                    products={products}
                    category={`Helmet`}
                    bannerUrl={
                      'https://images-eu.ssl-images-amazon.com/images/G/31/IN-hq/2018/img/Jewelry/XCM_Manual_1123727_brand_770x300_Jewelry_banner_770x300_jpg.jpg'
                    }
                  />
                  <Footer pos={''} />
                </div>
              }
            />

            <Route
              path="/productView/:id"
              element={
                <div>
                  <Header />
                  <ProductView products={products} />
                  <Footer pos={''} />
                </div>
              }
            />
            <Route
              path="profile"
              element={
                <div>
                  <Header />
                  {loggedin ? <Profile atBottom={true} /> : <Home />}
                  <Footer pos={'bottom'} />
                </div>
              }
            />
            <Route
              path="orderHistory"
              element={
                <div>
                  <Header />
                  {loggedin ? <OrderHistory /> : <Home />}
                  <Footer pos={'bottom'} />
                </div>
              }
            />
            <Route
              path="editProfile"
              element={
                <div>
                  <Header />
                  {loggedin ? <EditProfile /> : <Home />}
                  <Footer pos={'bottom'} />
                </div>
              }
            />
            <Route
              path="changePassword"
              element={
                <div>
                  <Header />
                  {loggedin ? <ChangePassword /> : <Home />}
                  <Footer pos={'bottom'} />
                </div>
              }
            />
            <Route
              path="/checkout"
              element={
                <div>
                  <Header />
                  {loggedin ? <Checkout step={0} /> : <Home />}
                  <Footer pos={'bottom'} />
                </div>
              }
            />
            <Route
              path="/checkout1"
              element={
                <div>
                  <Header />
                  {loggedin ? <Checkout step={1} /> : <Home />}
                  <Footer pos={'bottom'} />
                </div>
              }
            />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
