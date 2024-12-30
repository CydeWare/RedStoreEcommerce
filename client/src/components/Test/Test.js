import React, { Component, useState, useEffect } from 'react'
import Product from "../Products/Product/Product.js";
import product1 from "../images/product-1.jpg"
import product2 from "../images/product-2.jpg"
import product3 from "../images/product-3.jpg"
import product4 from "../images/product-4.jpg"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from '@material-ui/core'
import { getProducts } from "../../actions/products.js"
import Navbar from '../Navbar/Navbar.js';


const Test = () => {

    // const [products, setProducts] = useState([
    //   {   
    //     img: product1,
    //     name: "Red Printed T-shirt",
    //     price: "$50.00"
    // },
    // {
    //     img: product2,
    //     name: "Black Sneakers",
    //     price: "$50.00"
    // },
    // {
    //     img: product3,
    //     name: "White Jeans",
    //     price: "$70.00"
    // },
    // {
    //     img: product4,
    //     name: "Black T-shirt",
    //     price: "$80.00"
    // }
    // ])
    

    // const products = useSelector((state) => {console.log("PRODUCT STATE" + state); console.log("PRODUCTS" + state.products); return state.products})
    const products = useSelector((state) => {
      console.log("STATE" + state)
      console.log("STATE PRODUCT" + state.products)
      return state.products;
    });
    const dispatch = useDispatch();

    //If we get the products, and it has nothing, it should be an empty array instead of undefined...
    

    useEffect(() => {
      dispatch(getProducts())
  }, [])

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
    const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

    console.log(products);

    return (
        <div className="products-container">
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

          
          
          <div className="small-container">
            <div className="row row-2">
              <h2>All Products</h2>
              
              <select>
                <option>Default Sorting</option>
                <option>Sort by price</option>
                <option>Sort by popularity</option>
                <option>Sort by rating</option>
                <option>Sort by sale</option>
              </select>

            </div>
            
            
            <div className="row">

              
              {!products.length ? <CircularProgress style={{marginBottom: "100px", marginTop: "50px"}}/> : products.map((product) => {

                return (<Product product={product} />)

              })}

              
            </div>
            
            <div className="page-btn">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>→</span>
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

      

};

export default Test;