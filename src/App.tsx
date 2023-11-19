import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from './pages/SignIn';
import Home from './pages/Home';
import SignUp from './pages/SingUp';
import ShoppingCart from './pages/ShoppingCart'
import Category from './pages/Category';
import ProductDetails from './pages/Product';
import Header from './Components/Header';
import HomeHeader from './Components/HomeHeader';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GoToCompere from './pages/GoToCompere';
import CompereProducts from './pages/CompereProducts';

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

function App() {


  return (

    <>

      <ThemeProvider theme={theme}>
        <Header />
        <HomeHeader />


        
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/sign in" element={<SignIn />} />
            <Route path="/sign up" element={<SignUp />} />
            <Route path="/compere/:product_id_1/:product_id_2" element={<CompereProducts />} />
            <Route path="/go to compere/:product_id/:category_id" element={<GoToCompere />} />
            <Route path="/product/:product_id/:category_id" element={<ProductDetails />} />
            <Route path="/category/phones" element={<Category name='Phones' />} />
            <Route path="/category/refrigerators" element={<Category name='Refrigerators' />} />
            <Route path="/category/shirts" element={<Category name='Shirts' />} />
            <Route path="/category/laptops" element={<Category name='Laptops' />} />
            <Route path="/category/chargers" element={<Category name='Chargers' />} />
            <Route path="/category/headphones" element={<Category name='Headphones' />} />
            <Route path="/category/bottles" element={<Category name='Bottles' />} />
          </Routes>
        
      </ThemeProvider>

    </>
  )
}

export default App
