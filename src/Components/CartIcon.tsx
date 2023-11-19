import React, { useState, useEffect, } from 'react';
import { useNavigate } from "react-router-dom";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { ProductsCart, getFromUserInDB } from '../pages/ShoppingCart';

const CartIcon = () => {
  const navigate = useNavigate()

  const [cartQuantity, setCartQuantity] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [cartData, setCartData] = useState<ProductsCart[]>([]);

  const authToken = localStorage.getItem('token');

  const handleClick = () => {
    navigate('/cart')
    setIsClicked(!isClicked);
  };

  const calculateTotalQuantity = (products: ProductsCart[]): number => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };
  

  useEffect(() => {
    const fetchData = async () => {
      let totalQuantity;

      if (localStorage.getItem('token')) {
        const userID = JSON.parse(localStorage.getItem('user_id'));
        totalQuantity = await getFromUserInDB(userID!, authToken!);
        calculateTotalQuantity(totalQuantity)
        ;
      } else {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        calculateTotalQuantity(cartData)
      }

      // Update the cartQuantity state
      setCartQuantity(totalQuantity);
    }
    fetchData()
  }, []);

  return (
    <div>
      <IconButton
        onClick={handleClick}
        sx={{
          color: isClicked ? 'lightblue' : 'blue',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&.Mui-focusVisible': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Badge badgeContent={cartQuantity} color="error" >
          <ShoppingCartIcon color="primary" />
        </Badge>
      </IconButton>
    </div>
  );
};

export default CartIcon;