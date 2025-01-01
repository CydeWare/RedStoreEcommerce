import React, { Component } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from '../Navbar/Navbar.js';

const Contact = () => {

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
          {/* ------- Contact Us -------- */}
          <div className="small-container contact-container">
            <h1>Contact Us</h1>
            <hr className="line" />
          </div>
          <section className="location">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.794625742212!2d0.03126567594276563!3d51.53532660866358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a7c7925b84c7%3A0x7f90b5df104ff590!2sInnovative%20College%20London!5e0!3m2!1sen!2sid!4v1683376587238!5m2!1sen!2sid" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </section>
          <section className="contact-us">
            <div className="row">
              <div className="contact-col">
                <div>
                  <i className="fa fa-home" aria-hidden="true" />
                  <span>
                    <h5>XYZ Road, ABC Building</h5>
                    <p>United Kingdom, London, Central Street</p>
                  </span>
                </div>
                <div>
                  <i className="fa fa-phone" aria-hidden="true" />
                  <span>
                    <h5>+1 4029148709</h5>
                    <p>Monday to Saturday, 10AM to 6PM</p>
                  </span>
                </div>
                <div>
                  <i className="fa fa-envelope-o" aria-hidden="true" />
                  <span>
                    <h5>ukcampus@gmail.com</h5>
                    <p>Email Us your query</p>
                  </span>
                </div>
              </div>
              <div className="contact-col">
                <form>
                  <input type="text" name="name" placeholder="Enter your name" id="name" required />
                  <input type="email" name="email" placeholder="Enter your email address" id="email" required />
                  <input type="text" name="subject" placeholder="Enter your subject" id="subject" required />
                  <textarea rows={8} name="message" placeholder="Message" id="message" required defaultValue={""} />
                  <button type="submit" className="btn">Send Message</button>
                </form>
                {/* -------- Email Autoresponder Functionality ---------- */}
              </div>
            </div>
          </section>
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

    //   function sendEmail(){
    //     Email.send({
    //         SecureToken: "97a1529e-d3f4-48ff-931d-61e5f20d6404", //97a1529e-d3f4-48ff-931d-61e5f20d6404
    //         To : 'edwardvincentius6@gmail.com',
    //         From : document.getElementById("email").value,
    //         Subject : document.getElementById("subject").value,
    //         Body : document.getElementById("message").value
    //     }).then(
    //     message => alert(message)
    //     );
    // }
}

export default Contact;