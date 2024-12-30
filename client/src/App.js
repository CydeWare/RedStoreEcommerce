import React from 'react';
import Home from "./components/Home/Home.js";
import Contact from "./components/Contact/Contact.js";
import ProductDetails from './components/Product-details/ProductDetails.js';
import About from "./components/About/About.js";
import Sell from "./components/Sell/Sell.js";
import SellDetails from "./components/Sell-details/SellDetails.js";
import Account from "./components/Account/Account.js";
import Products from "./components/Products/Products.js";
import Cart from "./components/Cart/Cart.js";
// import Test from "./components/Test/Test.js";
// import Form from './components/Form/Form.js';
import "./styles.css"


import { BrowserRouter, Routes, Route } from "react-router-dom"; //Switch is not supported anymore in react-router-dom new version v6


const App = () => {

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={< Home/>} />
                <Route path="/products" exact element={< Products/>} />
                <Route path="/product-details/:id" exact element={< ProductDetails/>} />
                <Route path="/about" exact element={< About/>} />
                <Route path="/contact" exact element={< Contact/>} />
                <Route path="/sell" exact element={< Sell/>} />
                <Route path="/sell-details" exact element={< SellDetails/>} />
                <Route path="/account" exact element={< Account/>} />
                <Route path="/cart" exact element={< Cart/>} />
            </Routes>
            
        </BrowserRouter>
        

    );
}

//            <Container max-width="lg">

/*

<Routes>
                <Route path="/" exact element={< Home/>} />
                <Route path="/auth" exact element={< Auth />} />
            </Routes>
            <Container max-width="lg">
            <Navbar />
            
        </Container>

*/
 
export default App;