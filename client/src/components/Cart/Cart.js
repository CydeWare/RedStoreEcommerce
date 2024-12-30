import React, { Component, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, deleteCartItem, updateCartItem } from '../../actions/cart.js';
import CartItem from "./CartItem/CartItem.js"
import { CircularProgress } from '@material-ui/core'
import Navbar from '../Navbar/Navbar.js';
import Checkout from "../Checkout/Checkout.js";


const Cart = () => {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"))

  const allCartItems = useSelector((state) => { return state.cart });

  const cartItems = allCartItems.filter((cartItem) => {
    const id = user?.result?._id ? user?.result?._id : user?.result?.sub;
    return cartItem.userId === id;
  })

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    dispatch(getCartItems());
  }, [])


    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
      const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));


    //For adding the subtotal
    let total = 0;

    useEffect(() => {
    
      cartItems?.map((cartItem) => {
        total = total + cartItem.subtotal;
        setSubtotal(total);
    })
      
      
    }, [cartItems])

    return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>All Products - Redstore </title>
          <link rel="stylesheet" href="style.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
          <div className="container">
            <Navbar />
          </div>
          {/* ------ cart items details -------- */}
          <div className="small-container cart-page">
            <div className="update-form-storage" id="checkout-form-storage">
              <div className="update-form-container" id="checkout-form" style={{width: "800px"}}>
                    <i className="fa fa-times" onClick={() => closeCheckout()}></i>
                    <Checkout subtotal={subtotal} tax={(5/100 * subtotal)} total={((subtotal + (5/100 * subtotal)) + 10)} shipping={10} cartItems={cartItems}/>
              </div>
            </div>
            <table>
              <tbody><tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
                {user?.result  ? ( cartItems?.length ? 
          
          cartItems.map((cartItem) => {
            return <CartItem key={cartItem.id} cartItem={cartItem}/>
          }) 
          : 
          <div style={{marginTop: "50px", marginBottom: "70px", display: "flex", flexDirection: "column"}}>
          <h1>No products are added to your cart</h1>
          <Link to="/products"><span className="btn">Buy Something</span></Link>
          </div> )
                
            : <div className="sign-in-warning-container" style={{marginTop: "50px", marginBottom: "70px", display: "flex", flexDirection: "column"}}>
            <p className="sign-in-warning" style={{fontSize: "24px"}}>Please Sign In to Add Products To Your Cart!</p>
            <Link to="/account"><span style={{fontSize: "20px", padding: "10px 20px 10px 20px"}}className="btn">Sign In</span></Link>
            </div>

              
                }

                {/* <CircularProgress style={{marginBottom: "100px", marginTop: "80px", width: "110px", height: "110px"}}/> */}
              </tbody></table>
            <div className="total-price">
              <table>
                <tbody><tr>
                    <td>Subtotal</td>
                    
                    <td>${!cartItems?.length ? 0 : subtotal}.00</td>
                    {/* {cartItems[0].currency === "USD $" ? "$" : cartItems[0].currency} */}
                  </tr>
                  <tr>
                    <td>Tax</td>
                    <td>${(!cartItems?.length ? 0 : (5/100 * subtotal)) % 1 !== 0 ? `${(!cartItems?.length ? 0 : (5/100 * subtotal))}0` : `${(!cartItems?.length ? 0 : (5/100 * subtotal))}.00`}</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td>${!cartItems?.length ? 0 : 10}.00</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>${(!cartItems?.length ? 0 : (subtotal + (5/100 * subtotal) + 10)) % 1 !== 0 ? `${(!cartItems?.length ? 0 : (subtotal + (5/100 * subtotal) + 10))}0` : `${(!cartItems?.length ? 0 : (subtotal + (5/100 * subtotal) + 10))}.00`}</td>
                  </tr>
                  <tr>
                    {cartItems?.length > 0 && <span className="btn" onClick={() => {return checkout()}}>Buy All</span>}
                  </tr>
                </tbody></table>
            </div>
          </div>
          {/*-- Footer ---*/}
          <div className="footer">
            <div className="container">
              <div className="row">
                <div className="footer-col-1">
                  <h3>Download Our App</h3>
                  <p>Download App for Android and ios mobile phone.</p>
                  <div className="app-logo">
                    <img src={images["play-store.png"]} alt="" />
                    <img src={images["app-store.png"]} alt="" />
                  </div>
                </div>
                <div className="footer-col-2">
                  <img src={images["logo-white.png"]} alt="" />
                  <p>Our Purpose Is To Sustainably Make the Pleasure and Benefits of Sports Accesible to the Many.</p>
                </div>
                <div className="footer-col-3">
                  <h3>Useful Link</h3>
                  <ul>
                    <li>Coupons</li>
                    <li>Blog Post</li>
                    <li>Return Policy</li>
                    <li>Join Affiliate</li>
                  </ul>
                </div>
                <div className="footer-col-4">
                  <h3>Follow Us</h3>
                  <ul className="follow-us">
                    <li>Facebook<i className="fa fa-facebook-official" aria-hidden="true" /></li>
                    <li>Twitter<i className="fa fa-twitter" aria-hidden="true" /></li>
                    <li>Instagram<i className="fa fa-instagram" aria-hidden="true" /></li>
                    <li>YouTube<i className="fa fa-youtube-play" aria-hidden="true" /></li>
                  </ul>
                </div>
              </div>
              <hr />
              <p className="copyright">Copyright 2020 -  Edwur </p>
            </div>
          </div>
          {/* JS for toggle menu */}
        </div>
      );

      function checkout(){
        let updateForm = document.getElementById("checkout-form");
        let containerForm = document.getElementById("checkout-form-storage");

        if(containerForm.style.visibility === "visible"){
          updateForm.style.visibility = "hidden";
          updateForm.style.opacity = "0";
          containerForm.style.visibility = "hidden";
          containerForm.style.opacity = "0";
        } else {
          updateForm.style.visibility = "visible";
          updateForm.style.opacity = "1";
          containerForm.style.visibility = "visible";
          containerForm.style.opacity = "1";
        }
      }

      function closeCheckout(){
        let updateForm = document.getElementById("checkout-form");
        let containerForm = document.getElementById("checkout-form-storage");

        dispatch(getCartItems()); //To refresh the product data if closed

        updateForm.style.visibility = "hidden";
        updateForm.style.opacity = "0";
        containerForm.style.visibility = "hidden";
        containerForm.style.opacity = "0";
      }
}

export default Cart;