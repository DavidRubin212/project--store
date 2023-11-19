import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';

import logo from '../assets/logo.jpg'
import CartIcon from './CartIcon';
// import { ProductsCart, getFromUserInDB } from '../pages/ShoppingCart';


const defaultTheme = createTheme();



export default function Header() {

  const [isAtTop, setIsAtTop] = useState(true);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const authToken = localStorage.getItem('token');

  const calculateTotalQuantity = (products: ProductsCart[]): number => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };
  
  let fetchData

  useEffect(() => {

    // fetchData = async () => {

    //   let totalQuantity;

    //   if (localStorage.getItem('token')) {
    //     const userID = JSON.parse(localStorage.getItem('user_id',));
    //     totalQuantity = await getFromUserInDB(userID!, authToken!);
    //     calculateTotalQuantity(totalQuantity)
    //       ;
    //   } else {
    //     const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    //     calculateTotalQuantity(cartData)
    //   }

    //   // Update the cartQuantity state
    //   setCartQuantity(totalQuantity);
    // }
    // fetchData()


    const handleScroll = () => {
      const atTop = window.scrollY === 0;
      setIsAtTop(atTop);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchData]);


  return (
    <div className={`header ${isAtTop ? 'hidden' : 'visible'}`}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <AppBar
          position="fixed"
          color=""
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, textAlign: 'start' }}>

              <Link href="/home">
                <img src={logo} alt="logo" style={{ maxWidth: '7em' }} />
              </Link>

            </Typography>
            <nav>
              <CartIcon cartItemsCount={cartQuantity} />
            </nav>
            {localStorage.getItem("token") ?
              <h3 style={{ marginLeft: '1%' }}>{localStorage.getItem('user_name')}
                <Button variant="text" sx={{ my: 1, mx: 1.5 }}
                  onClick={() => localStorage.setItem("token", "")}>
                  log out
                </Button>
              </h3>
              :
              <Button
                href="/sign in" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                Sign in
              </Button>}

          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}