import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import SignIn from './pages/SignIn';
import Home from './pages/Home';
import SignUp from './pages/SingUp';
import ShoppingCart from './pages/Cart'
import Category from './pages/Category';
import ProductDetails from './pages/Product';
import Header from './Components/Header';
import HomeHeader from './Components/HomeHeader';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
    <Header/>
    <HomeHeader/>


      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path='cart' element={<ShoppingCart/>}/>
          <Route path="/sign in" element={<SignIn/>} />
          <Route path="/sign up" element={<SignUp/>} />
          <Route path="/product/:product_id" element={<ProductDetails/>} />
          <Route path="/category/phones" element={<Category name='phones'/>} />
          <Route path="/category/refrigerators" element={<Category name='refrigerators'/>} />
          <Route path="/category/shirts" element={<Category name='shirts'/>} />
          <Route path="/category/laptops" element={<Category name='laptops'/>} />
          <Route path="/category/chargers" element={<Category name='chargers'/>} />
          <Route path="/category/headphones" element={<Category name='headphones'/>} />
          <Route path="/category/bottles" element={<Category name='bottles'/>} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>

    </>
  )
}

export default App
