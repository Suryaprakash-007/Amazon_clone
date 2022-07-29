import React from 'react';
import Header from '../Header/Header';

//error page displayed when user hits the undeclared route
function ErrorPage() {
  return (
    <div>
      <Header />
      <div style={{ textAlign: 'center', marginTop: '11em', color: 'orange' }}>
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/404-error-page-2952323-2451625.png"
          alt="404 not found"
          height="260em"
        />
        <h1>Error 404 - Page Not Found</h1>
        <p>
          The page you are looking for doesn't exist , please check your URL
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
