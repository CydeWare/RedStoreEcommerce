import React, { Component } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from '../Navbar/Navbar.js';


const About = () => {

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
          <title>All Products - Redstore </title>
          <link rel="stylesheet" href="style.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
          <div className="container">
          <Navbar />
            </div>
          {/* ------- About Us ---------- */}
          <div className="small-container about-us">
            <h1>About Us</h1>
            <hr className="about-us line" />
            <div className="row">
              <div className="col-2 first">
                <h2>We have great employees!</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor ligula lectus, vel efficitur metus vehicula a. Morbi et bibendum neque. Sed sodales urna eros, eu dapibus arcu viverra vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus, dui eget faucibus maximus, magna nisl suscipit leo, in pulvinar sapien ipsum id lorem. Pellentesque auctor urna quis turpis placerat, dignissim efficitur enim sodales. </p>
                <Link to="/contact"><button className="btn contact-btn">Contact Us</button></Link>
              </div>
              <div className="col-2">
                <img className="employee" src={images["employees.jpg"]} alt="" />
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

export default About;