import React, { Component, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/products.js';
import Navbar from '../Navbar/Navbar.js';
import moment from "moment";
import Product from "../Products/Product/Product.js";
import { CircularProgress } from '@material-ui/core'

const Home = () => {

  const products = useSelector((state) => {
    return state.products;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
}, [])

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
      const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

    return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>E-commerce</title>
          <link rel="stylesheet" href="style.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
          <div className="header">
            <div className="container">
              <Navbar />
              <div className="row">
                <div className="col-2">
                  <h1>Give Your Workout<br /> A New Style!</h1>
                  <p>Success isn't always about greatness. It's about consistency. Consistent<br /> hard work gains success. Greatness will come.</p>
                  <Link to="/products"><span className="btn">Explore Now →</span></Link>
                </div>
                <div className="col-2">
                  <img src={images["image1.png"]} alt="img" />
                </div>
              </div>
            </div>
          </div>
          {/*- Feature categories ----*/}
          <div className="categories">
            <div className="small-container">
              <div className="row">
                <div className="col-3">
                  <img src={images["category-1.jpg"]} />
                </div>
                <div className="col-3">
                  <img src={images["category-2.jpg"]} />
                </div>
                <div className="col-3">
                  <img src={images["category-3.jpg"]} />
                </div>
              </div>
            </div>
          </div>
          {/*- featured products ---*/}
          <div className="small-container">
            <h2 className="title">Featured Products</h2>
            <div className="row">
              {!products.length ? <CircularProgress style={{marginBottom: "50px", marginTop: "25px"}}/> : products.slice(0, 4).map((product) => {
                return (<Product product={product} />)
              })}
            </div>
            <h2 className="title">Latest Products</h2>
            <div className="row">
            {!products.length ? <CircularProgress style={{marginBottom: "50px", marginTop: "25px"}}/> : products.slice(4, products.length).map((product) => {
                return (<Product product={product} />)
              })}
            </div>
          </div>
          {/*-- OFFER ---*/}
          <div className="offer">
            <div className="small-container">
              <div className="row">
                <div className="col-2">
                  <img src={images["exclusive.png"]} className="offer-img" alt="" />
                </div>
                <div className="col-2">
                  <p>Exclusively Available on RedStore</p>
                  <h1>Smart Band 4</h1>
                  <small>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque lacinia enim. Suspendisse potenti. Maecenas purus ex, maximus eget semper ut, volutpat non lectus. Aliquam venenatis, augue in porttitor accumsan, dolor velit malesuada risus, nec suscipit eros est a quam. Quisque nulla metus, commodo eget consectetur non, feugiat nec dui. Vestibulum euismod bibendum tellus non dignissim. Sed nisi felis, lacinia nec blandit eu, tempor tempor massa. Praesent aliquet tristique tincidunt. Curabitur egestas eleifend dolor vel facilisis. 
                  </small><br />
                  <a href className="btn">Buy Now →</a>
                </div>
              </div>
            </div>
          </div>
          {/*- testimonial --*/}
          <div className="testimonial">
            <div className="small-container">
              <div className="row">
                <div className="col-3">
                  <i className="fa fa-quote-left" />
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque lacinia enim. Suspendisse potenti. Maecenas purus ex, maximus eget semper ut, volutpat non lectus.</p>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" aria-hidden="true" />
                  </div>
                  <img src={images["user-1.png"]} alt="" />
                  <h3>Alex Britsney</h3>
                </div>
                <div className="col-3">
                  <i className="fa fa-quote-left" />
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque lacinia enim. Suspendisse potenti. Maecenas purus ex, maximus eget semper ut, volutpat non lectus.</p>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" aria-hidden="true" />
                  </div>
                  <img src={images["user-2.png"]} alt="" />
                  <h3>Presley Wills</h3>
                </div>
                <div className="col-3">
                  <i className="fa fa-quote-left" />
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque lacinia enim. Suspendisse potenti. Maecenas purus ex, maximus eget semper ut, volutpat non lectus.</p>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" aria-hidden="true" />
                  </div>
                  <img src={images["user-3.png"]} alt="" />
                  <h3>Fiona Greyman</h3>
                </div>
              </div>
            </div>
          </div>
          {/*- Brands --*/}
          <div className="brands">
            <div className="small-container">
              <div className="row">
                <div className="col-5">
                  <img src={images["logo-godrej.png"]} alt="" />
                </div>
                <div className="col-5">
                  <img src={images["logo-oppo.png"]} alt="" />
                </div>
                <div className="col-5">
                  <img src={images["logo-coca-cola.png"]} alt="" />
                </div>
                <div className="col-5">
                  <img src={images["logo-paypal.png"]} alt="" />
                </div>
                <div className="col-5">
                  <img src={images["logo-philips.png"]} alt="" />
                </div>
              </div>
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

      function menutoggle(){
        let MenuItems = document.getElementById("MenuItems");

        if(MenuItems.style.maxHeight === "300px"){
          MenuItems.style.maxHeight = "0px";
        } else{ 
          MenuItems.style.maxHeight = "300px";
        }
      } 
}

export default Home;