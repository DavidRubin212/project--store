import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


import Product from './pages/Product';
  import SignIn from './Components/SignIn';
import Home from './Components/Home';
import SignUp from './Components/SignUp';

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
        <a href="/product">product</a>
     </nav>

     <h1>welcome to our store</h1>

      <BrowserRouter>
        <Routes>
          <Route path="/product" element={<Product />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/sign in" element={<SignIn/>} />
          <Route path="/sign up" element={<SignUp/>} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
