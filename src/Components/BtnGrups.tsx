import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function BtnGroup() {

  const handleButtonClick = (url: string) => {
    window.location.href = url;
  };

  return (
    <nav>
      <ButtonGroup variant="outlined" aria-label="outlined primary button group">

        <Button onClick={() => handleButtonClick('/category/phones')}>phones</Button>
        <Button onClick={() => handleButtonClick('/category/refrigerators')}>refrigerators</Button>
        <Button onClick={() => handleButtonClick('/category/shirts')}>shirts</Button>
        <Button onClick={() => handleButtonClick('/category/laptops')}>laptops</Button>
        <Button onClick={() => handleButtonClick('/category/chargers')}>chargers</Button>
        <Button onClick={() => handleButtonClick('/category/headphones')}>headphones</Button>
        <Button onClick={() => handleButtonClick('/category/bottles')}>bottles</Button>

      </ButtonGroup>
    </nav>
  );
}