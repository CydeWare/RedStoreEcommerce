import React, { Component, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { IconButton, InputAdornment } from '@material-ui/core';
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signin, signup } from "../../actions/auth"
import * as jose from 'jose';
import { SignJWT } from 'jose';
import Icon from "./Icon.js";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from "./Input.js"
import Navbar from '../Navbar/Navbar.js';

const Account = () => {
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }   
      const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
      

      const initialState = { firstName: " ", lastName: " ", email: " ", password: " ", confirmPassword: " "};

      const [showPassword, setShowPassword] = useState(false);
      const [isSignup, setIsSignup] = useState(true);
      const [user, setUser] = useState({});
      const [formData, setFormData] = useState(initialState)
      const [confirmPassword, setConfirmPassword] = useState(false);
      const [type, setType] = useState("");
      const error = useSelector((state) => state.error);


      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if(isSignup === true){
          if(formData.password !== formData.confirmPassword){
            return setConfirmPassword(true);
          }else{
            setConfirmPassword(false);
          }
        }
        

        if(isSignup){
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup)
      setShowPassword(false);
  }

  const handleShowPassword = (e) => {

    setType(e.target.type);
    return setShowPassword((prevShowPassword) => !prevShowPassword)
  
  }
      

      const handleLogin = useGoogleLogin({
        // flow: 'auth-code',
        // scope: "https://www.googleapis.com/auth/userinfo.profile",
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse)
            const data = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
            const result = await data?.json();
            console.log(data);
            console.log(result);

            // const secret = new TextEncoder().encode(
            //     "test"
            // );

            // const token = await new jose.SignJWT({ email: result.email, id: result.sub}).setProtectedHeader({ alg: "HS256"}).setExpirationTime('1h').sign(secret);
            
            // console.log(token);
            

            const secret = new TextEncoder().encode("test");

            const jwt = await new SignJWT({ email: result.email, id: result.sub })
                        .setProtectedHeader({ alg: "HS256" })
                        .setExpirationTime('1h')
                        .sign(secret);

            try{
                dispatch({ type: "AUTH", data : {result, token: jwt}})

                navigate("/");
            }catch(error){
                console.log(error)
            }

            //In google login, make your own token?
        },
        onError: tokenResponse => console.log(tokenResponse)
      });

      function showError(error){
        if(error){
            return ( <p style={{color:"red", fontSize:"12px", textAlign:"center"}}>{error}</p> )
        }
    }

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
          {/* -------- account page --------- */}
          <div className="account-page">
            <div className="container">
              <div className="row">
                <div className="col-2">
                  <img src={images["image1.png"]} width="100%" alt="" />
                </div>
                <div className="col-2">
                  <div className="form-container">
                    <div className="form-btn">
                      <span className="login-register" onClick={() => {login(); switchMode(); }}>Login</span>
                      <span className="login-register" onClick={() => {register(); switchMode(); } }>Register</span>
  
                      <hr id="Indicator" />
                    </div>
                    <form id="LoginForm" onSubmit={(e) => handleSubmit(e)}>
                      <input name="email" type="text" placeholder="Email" onChange={(e) => handleChange(e)}/>
                      <input name="password" placeholder="Password" onChange={(e) => handleChange(e)} type={showPassword ? "text" : "password"} handleShowPassword={(e) => handleShowPassword(e)}/>
                      {
                        showError(error)
                      }
                      <button type="submit" className="btn">Login</button>
                      <div className="google-login-container">
                      <span className="google-login" onClick={() => handleLogin()}><Icon /><p>Google Sign In</p></span>
                      <p className="forgot-pass">Forgot Password</p>
                      </div>
                    </form>
                    <form id="RegForm" onSubmit={(e) => handleSubmit(e)}>
                      <input name="firstName" type="text" placeholder="First Name" onChange={(e) => handleChange(e)}/>
                      <input name="lastName" type="text" placeholder="Last Name" onChange={(e) => handleChange(e)}/>
                      <input name="email" type="email" placeholder="Email" onChange={(e) => handleChange(e)}/>
                      <input name="password" placeholder="Password"  onChange={(e) => handleChange(e)} type={showPassword ? "text" : "password"} handleShowPassword={() => handleShowPassword()}/>
                      <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={(e) => handleChange(e)}/>
                      {confirmPassword === true && <p style={{color:"red", fontSize:"12px", textAlign:"center"}}>Please confirm your password</p>}
                      {
                        showError(error)
                      }
                      <button type="submit" className="btn">Register</button>
                      <span className="google-login" onClick={() => handleLogin()}><Icon /><p>Google Sign In</p></span>
                    </form>
                  </div>
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
          {/* ------- JS for toggle form -------- */}
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

      

            function register(){
                let LoginForm = document.getElementById("LoginForm")
                let RegForm = document.getElementById("RegForm")
                let Indicator = document.getElementById("Indicator")

                RegForm.style.transform = "translateX(0px)";
                LoginForm.style.transform = "translateX(0px)";
                Indicator.style.transform = "translateX(100px)";
            }

            function login(){
                let LoginForm = document.getElementById("LoginForm")
                let RegForm = document.getElementById("RegForm")
                let Indicator = document.getElementById("Indicator")

                RegForm.style.transform = "translateX(300px)";
                LoginForm.style.transform = "translateX(300px)";
                Indicator.style.transform = "translateX(0px)";
            }
}

export default Account;