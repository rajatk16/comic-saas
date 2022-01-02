import '../styles/globals.css';
import UserProvider from '../context/user';
import CartProvider from '../context/cart';
import React from 'react';
import { Header } from '../components/Header';

function MyApp({ Component, pageProps }) { 
  return (
    <UserProvider>
      <CartProvider>
        <Header />
        <div className="container m-auto h-screen">
          <Component {...pageProps} />
        </div>
      </CartProvider>
    </UserProvider>
  )
}

export default MyApp
