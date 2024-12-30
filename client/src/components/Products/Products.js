import React, { Component, useState, useEffect } from 'react'
import Product from "./Product/Product.js";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from '@material-ui/core'
import { getProducts } from "../../actions/products.js"
import moment from "moment";
import Navbar from '../Navbar/Navbar.js';


const Products = () => {
   
    const products = useSelector((state) => {
      return state.products;
    });
    const dispatch = useDispatch();
  	
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
      dispatch(getProducts())
  }, [])

  useEffect(() => {
      const newLatestProducts = products.filter((product) => {
        let days = moment().diff(moment(product.createdAt), 'days');
        console.log("Days:" + days)

        return days <= 1; //Products for less than 1 day
      })
      setLatestProducts(newLatestProducts)
  }, [products])

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
    const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

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

            {latestProducts.length > 0 && 
            <div>
              <h2 class="title">Latest Products</h2>
                <div className="row">

                {latestProducts.map((product) => {

                  return (<Product product={product} />)
                })}

                </div>
            </div>
          }
            
            
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

export default Products;




// import React, { Component } from 'react'
// import Product from "./Product/Product";
// import product1 from "../images/product-1.jpg";
// import product2 from "../images/product-2.jpg";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useSelector } from 'react-redux';

// const Products = () => {

//     // const products = [
//     //     {
//     //         img: product1,
//     //         name: "Red Printed T-shirt",
//     //         price: "$50.00"
//     //     },
//     //     {
//     //         img: product2,
//     //         name: "Black Sneakers",
//     //         price: "$50.00"
//     //     },
//     //     {
          
//     //     }
//     // ];

//     const products = useSelector((state) => {return state.products})
    
//     function importAll(r) {
//         let images = {};
//         r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//         return images;
//       }
      
//       const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

//     return (
//         <div>
//           <meta charSet="UTF-8" />
//           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//           <title>All Products - Redstore </title>
//           <link rel="stylesheet" href="style.css" />
//           <link rel="preconnect" href="https://fonts.googleapis.com" />
//           <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
//           <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200&display=swap" rel="stylesheet" />
//           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
//           <div className="container">
//             <div className="navbar">
//               <div className="logo">
//                 <a href="index.html"><img src={images["logo.png"]} width="125px" alt="logo" /></a>
//               </div>
//               <nav>
//                 <ul id="MenuItems">
//                     <li><Link to="/">Home</Link></li>
//                     <li><Link to="/products">Products</Link></li>
//                     <li><Link to="/about">About</Link></li>
//                     <li><Link to="/contact">Contact</Link></li>
//                     <li><Link to="/sell">Sell</Link></li>
//                     <li><Link to="/account">Account</Link></li>
//                 </ul>
//               </nav>
//               <Link to="/cart"><img src={images["cart.png"]} width="30px" height="30px" /></Link>
//               <img src={images["menu.png"]} className="menu-icon" alt="menu" onClick={() => menutoggle()} />
//             </div>
//           </div>
//           <div className="small-container">
//             <div className="row row-2">
//               <h2>All Products</h2>
//               <select>
//                 <option>Default Sorting</option>
//                 <option>Sort by price</option>
//                 <option>Sort by popularity</option>
//                 <option>Sort by rating</option>
//                 <option>Sort by sale</option>
//               </select>
//             </div>
//             <div className="row">
//               <div className="col-4">
//                 <Link to="/product-details"><img src={images["product-1.jpg"]} alt="" /></Link>
//                 <Link to="/product-details"><h4>Red Printed T-shirt</h4></Link>
//                 <div className="rating">
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star-o" aria-hidden="true" />
//                 </div>
//                 <p>$50.00</p>
//               </div>
//               <div className="col-4">
//                 <img src={images["product-2.jpg"]} alt="" />
//                 <h4>Black Sneakers</h4>
//                 <div className="rating">
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star-half-o" aria-hidden="true" />
//                 </div>
//                 <p>$50.00</p>
//               </div>
//               <div className="col-4">
//                 <img src={images["product-3.jpg"]} alt="" />
//                 <h4>Gray Yoga Pants</h4>
//                 <div className="rating">
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star-half-o" />
//                   <i className="fa fa-star-o" aria-hidden="true" />
//                 </div>
//                 <p>$50.00</p>
//               </div>
//               <div className="col-4">
//                 <img src={images["product-4.jpg"]} alt="" />
//                 <h4>Blue Polo Shirt</h4>
//                 <div className="rating">
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star-o" />
//                   <i className="fa fa-star-o" aria-hidden="true" />
//                 </div>
//                 <p>$50.00</p>
//               </div>
//             </div>
//             <h2 className="title">Latest Products</h2>
//             <div className="row">
//               <div className="col-4">
//                 <img src={images["product-5.jpg"]} alt="" />
//                 <h4>Red Printed T-shirt</h4>
//                 <div className="rating">
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star-o" aria-hidden="true" />
//                 </div>
//                 <p>$50.00</p>
//               </div>
//               <div className="col-4">
//                 <img src={images["product-6.jpg"]} alt="" />
//                 <h4>Black Sneakers</h4>
//                 <div className="rating">
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star-half-o" aria-hidden="true" />
//                 </div>
//                 <p>$50.00</p>
//               </div>
//               <div className="col-4">
//                 <img src={images["product-7.jpg"]} alt="" />
//                 <h4>Gray Yoga Pants</h4>
//                 <div className="rating">
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star-half-o" />
//                   <i className="fa fa-star-o" aria-hidden="true" />
//                 </div>
//                 <p>$50.00</p>
//               </div>
//               <div className="col-4">
//                 <img src={images["product-8.jpg"]}alt="" />
//                 <h4>Blue Polo Shirt</h4>
//                 <div className="rating">
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star-o" />
//                   <i className="fa fa-star-o" aria-hidden="true" />
//                 </div>
//                 <p>$50.00</p>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-4">
//                 <img src={images["product-9.jpg"]} alt="" />
//                 <h4>Red Printed T-shirt</h4>
//                 <div className="rating">
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star-o" aria-hidden="true" />
//                 </div>
//                 <p>$50.00</p>
//               </div>
//               <div className="col-4">
//                 <img src={images["product-10.jpg"]} alt="" />
//                 <h4>Black Sneakers</h4>
//                 <div className="rating">
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star-half-o" aria-hidden="true" />
//                 </div>
//                 <p>$50.00</p>
//               </div>
//               <div className="col-4">
//                 <img src={images["product-11.jpg"]} alt="" />
//                 <h4>Gray Yoga Pants</h4>
//                 <div className="rating">
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star-half-o" />
//                   <i className="fa fa-star-o" aria-hidden="true" />
//                 </div>
//                 <p>$50.00</p>
//               </div>
//               <div className="col-4">
//                 <img src={images["product-12.jpg"]} alt="" />
//                 <h4>Blue Polo Shirt</h4>
//                 <div className="rating">
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star" />
//                   <i className="fa fa-star-o" />
//                   <i className="fa fa-star-o" aria-hidden="true" />
//                 </div>
//                 <p>$50.00</p>
//               </div>
//             </div>
//             <div className="page-btn">
//               <span>1</span>
//               <span>2</span>
//               <span>3</span>
//               <span>4</span>
//               <span>→</span>
//             </div>
//           </div>
//           {/*-- Footer ---*/}
//           <div className="footer">
//             <div className="container">
//               <div className="row">
//                 <div className="footer-col-1">
//                   <h3>Download Our App</h3>
//                   <p>Download App for Android and ios mobile phone.</p>
//                   <div className="app-logo">
//                     <img src={images["play-store.png"]} alt="" />
//                     <img src={images["app-store.png"]} alt="" />
//                   </div>
//                 </div>
//                 <div className="footer-col-2">
//                   <img src={images["logo-white.png"]} alt="" />
//                   <p>Our Purpose Is To Sustainably Make the Pleasure and Benefits of Sports Accesible to the Many.</p>
//                 </div>
//                 <div className="footer-col-3">
//                   <h3>Useful Link</h3>
//                   <ul>
//                     <li>Coupons</li>
//                     <li>Blog Post</li>
//                     <li>Return Policy</li>
//                     <li>Join Affiliate</li>
//                   </ul>
//                 </div>
//                 <div className="footer-col-4">
//                   <h3>Follow Us</h3>
//                   <ul className="follow-us">
//                     <li>Facebook<i className="fa fa-facebook-official" aria-hidden="true" /></li>
//                     <li>Twitter<i className="fa fa-twitter" aria-hidden="true" /></li>
//                     <li>Instagram<i className="fa fa-instagram" aria-hidden="true" /></li>
//                     <li>YouTube<i className="fa fa-youtube-play" aria-hidden="true" /></li>
//                   </ul>
//                 </div>
//               </div>
//               <hr />
//               <p className="copyright">Copyright 2020 -  Edwur </p>
//             </div>
//           </div>
//           {/* JS for toggle menu */}
//         </div>
//       );

//       function menutoggle(){
//         let MenuItems = document.getElementById("MenuItems");

//         if(MenuItems.style.maxHeight === "300px"){
//           MenuItems.style.maxHeight = "0px";
//         } else{ 
//           MenuItems.style.maxHeight = "300px";
//         }
//       } 

// };

// export default Products;