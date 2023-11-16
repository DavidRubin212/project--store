import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import SignIn from './Components/SignIn';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import Category from './Components/Category';
import ProductDetails from './Components/Product';

function App() {

  return (

    <>
     <nav>
        <a href="/home">Home</a>
      |
        <a href="/sign in">sign in</a>
      |
        <a href="/sign up">sign up</a>
      |
        {localStorage.getItem("token")?<span>{localStorage.getItem('user_name')} you are registered  |<button onClick={()=>localStorage.setItem("token","")}>log out</button></span>:<span>you are not registered</span>}
      
     </nav>

     <nav>
     <a href="/category/phones">phones</a>
      |
     <a href="/category/refrigerators">refrigerators</a>
      |
     <a href="/category/shirts">shirts</a>
      |
     <a href="/category/laptops">laptops</a>
      |
     <a href="/category/chargers">chargers</a>
      |
     <a href="/category/headphones">headphones</a>
      |
     <a href="/category/bottles">bottles</a>
     </nav>
     

      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/sign in" element={<SignIn/>} />
          <Route path="/sign up" element={<SignUp/>} />
          <Route path="/product/:product_id" element={<ProductDetails/>} />
          <Route path="/category/phones" element={<Category category_id='65547c770bf45c89e9d14f22'/>} />
          <Route path="/category/refrigerators" element={<Category category_id='65547c770bf45c89e9d14f21'/>} />
          <Route path="/category/shirts" element={<Category category_id='65547c770bf45c89e9d14f23'/>} />
          <Route path="/category/laptops" element={<Category category_id='65547c770bf45c89e9d14f24'/>} />
          <Route path="/category/chargers" element={<Category category_id='65547c770bf45c89e9d14f25'/>} />
          <Route path="/category/headphones" element={<Category category_id='65547c770bf45c89e9d14f26'/>} />
          <Route path="/category/bottles" element={<Category category_id='65547c770bf45c89e9d14f27'/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
