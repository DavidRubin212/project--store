import React, { useState, useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

const CartIcon = () => {
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    // Retrieve cart data from localStorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate the total quantity in the cart
    const totalQuantity = cartData.reduce((total, item) => total + item.quantity, 0);
    
    // Update the cartQuantity state
    setCartQuantity(totalQuantity);
  }, []);

  return (
    <Badge badgeContent={cartQuantity} color="error">
      <ShoppingCartIcon color="primary" />
    </Badge>
  );
};

export default CartIcon;