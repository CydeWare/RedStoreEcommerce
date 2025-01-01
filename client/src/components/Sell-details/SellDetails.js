import React, { Component, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createProduct, updateProduct } from "../../actions/products.js"
import no_product_img from "../images/no-product5.webp"
import FileBase from "react-file-base64";
import Navbar from '../Navbar/Navbar.js';

const SellDetails = ({currentId, setCurrentId}) => {


  const dispatch = useDispatch();

    const [productData, setProductData] = useState({
      selectedFile: [],
      title: "",
      description: "",
      address: "",
      price: 0,
      currency: "",
      stock: 0,
      shipping_method: "",
      weight: 0,
      ratings: []
    })

    const [isValidData, setIsValidData] = useState({notValid: false, type: "selectedFile"});
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("profile"))

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
      const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

    // useEffect(() => {
    //     if(product) setProductData(product);

    // }, [product])


    function handleSubmit(e){
      e.preventDefault();

      console.log(productData);

      for(const key in productData){
        
        if(productData.hasOwnProperty(key)){
          if(key === "ratings"){
            continue;
          }
          else if(key === "name"){
            continue;
          } else if(key === "address"){
            continue;
          }
          else if(!productData[key] || productData[key].length === 0){
                return setIsValidData({notValid: true, type: key === "selectedFile" ? "photo" : key});
            } else {
                setIsValidData({notValid: false, type: "already valid"});
            }
        }
    }

      if(currentId){
        dispatch(updateProduct(currentId, { ...productData, name: user?.result?.firstName ? `${user?.result?.firstName} ${user?.result?.lastName}` : user?.result?.name}))
        navigate("/products")
        clear();
      }else {
        dispatch(createProduct({...productData, name: user?.result?.firstName ? `${user?.result?.firstName} ${user?.result?.lastName}` : user?.result?.name}));
        navigate("/products")
        clear();
    }
    }

    const clear = () => {
      // setCurrentId(null);
      setProductData({
        selectedFile: [],
        title: "",
        description: "",
        address: "",
        price: 0,
        currency: "",
        stock: 0,
        shipping_method: "",
        weight: 0,
        ratings: []
      })
  }

  const deletePhoto = useCallback((index) => {

    const fileIndex = productData.selectedFile[index];

    let newSelectedFile = productData.selectedFile.filter((file) => {
      return file !== fileIndex;
    })
    setProductData({...productData, selectedFile: newSelectedFile});
  }, [productData.selectedFile])

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
          {/* sell details form */}
          {!user?.result ? 
          <div className="sign-in-warning-container">
          <p className="sign-in-warning">Please Sign In to Sell Your Products!</p>
          <Link to="/account"><span style={{fontSize: "20px", padding: "10px 20px 10px 20px"}}className="btn">Sign In</span></Link>
          </div>
          :
        
          <div className="container">
            <form autoComplete="off" noValidate onSubmit={(e) => handleSubmit(e)}>
              <div className="small-container sell-container">
                <h1>Tell Us About Your Product</h1>
                <hr className="line" />
              </div>
              <div className="row-vertical">
                <div className="upload-title-container">
                  <h2 className="upload-title">Upload Your Photos &amp; Videos</h2>
                  <p className="upload-desc">(You can upload more than one)</p>
                </div>
                <div className="row-3">
                  <div className="main-photo-container">
                    <div className="main-photo-storage">
                      <p className="main-photo-title">Main Photo</p>
                      
                      {

                        productData.selectedFile.length !== 0 ? productData.selectedFile.map((base64, index) => {

                          return (<div>
                          <i className="fa fa-trash-o" aria-hidden="true" onClick={() => {return deletePhoto(index)}}></i>    
                          <img className="main-photo" key={index} src={base64} alt="" /></div>)
                        
                        }) : <img className="main-photo" src={no_product_img} alt="" />
                      }
                      {/* <img className="main-photo" src={productData.selectedFile !== [] ? productData.selectedFile : images["product-2.jpg"]} alt="" /> */}
                    </div>
                    { productData.selectedFile.length > 3 && <h1 className="warning-title" style={{width: "470px", fontSize: "22px", marginBottom: "5px"}}>Maximum number of photos reached!</h1>}
                    
                  </div>
                  <div className="col-6">
                    <div className="icon-container">

                      <span className="input-file">
                        <FileBase
                          type="file"
                          mutiple={false}
                          onDone={({base64}) => {

                            let newSelectedFile = productData.selectedFile.concat(base64)

                            if(newSelectedFile.length < 5){
                              return setProductData({ ...productData, selectedFile: newSelectedFile})            
                            }

                            }}

                          ></FileBase>
                        <span className="icon-center">
                          <i className="fa fa-picture-o" aria-hidden="true"  />
                          <h3 className="icon-title">Upload your<br /> photo</h3>
                        </span>
                      </span>

                        <span className="input-file">
                        <FileBase
                          type="file"
                          mutiple={false}
                          onDone={({base64}) => {

                            let newSelectedFile = productData.selectedFile.concat(base64)
                            if(newSelectedFile.length < 5){
                              return setProductData({ ...productData, selectedFile: newSelectedFile})            
                            }
                            
                            }}

                          ></FileBase>
                        <span className="icon-center">
                        <i className="fa fa-video-camera" aria-hidden="true" />
                          <h3 className="icon-title">Upload your<br /> video</h3>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <hr />
                {/* <div className="col-6">
                  <h2 className="write-title">Write your Name</h2>
                  <p>Name of the Seller</p>
                  <input className="title-input" type="text" placeholder="Name" name="name" id="name" value={productData.name}
            onChange={(e) => setProductData({ ...productData, name: e.target.value})} />
                </div> */}
                <div className="col-6">
                  <h2 className="write-title">Write the Title of the product</h2>
                  <p>Title of the product</p>
                  <input className="title-input" type="text" placeholder="Title" name="title" id="title" value={productData.title}
            onChange={(e) => setProductData({ ...productData, title: e.target.value})} />
                </div>
                <hr />
                <div className="col-6">
                  <h2 className="write-title">Describe your product</h2>
                  <p>Description</p>
                  <textarea className="description-input" type="text" placeholder="Description" name="title" id="title"  value={productData.description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value})}  />
                </div>
                <hr />
                <div className="col-6">
                  <h2 className="write-title">Write your Address (Optional)</h2>
                  <p>Address (Optional)</p>
                  <input className="title-input" type="text" placeholder="Address" name="title" id="title"  value={productData.address}
            onChange={(e) => setProductData({ ...productData, address: e.target.value})}/>
                </div>
                <hr />
                <div className="col-6">
                  <h2 className="write-title">Choose your price</h2>
                  <h2 className="price-title">Price</h2>
                  <input className="price-input" type="number" placeholder="Price" name="title" id="title"  value={productData.price}
            onChange={(e) => setProductData({ ...productData, price: e.target.value})}/>
                  <select value={productData.currency}
            onChange={(e) => setProductData({ ...productData, currency: e.target.value})}>
                    <option>Select Currency</option>
                    <option>USD $</option>
                    <option>Euro €</option>
                    <option>Pound £</option>
                    <option>Rupee</option>
                    <option>Rupiah</option>
                    <option>Peso</option>
                  </select>
                  <div className="col-6">
                    <h2 className="quantity-title">Stock (Number of products currently in stock)</h2>
                    <input className="quantity-input" type="number" placeholder="Stock" name="stock" id="stock"  value={productData.stock}
            onChange={(e) => setProductData({ ...productData, stock: e.target.value})}/>
                  </div>
                </div>
                <hr />
                <div className="col-6">
                  <h2 className="write-title">Choose your Shipping Method</h2>
                  <select  value={productData.shipping_method}
            onChange={(e) => setProductData({ ...productData, shipping_method: e.target.value})}>
                    <option>Select Shipping Method</option>
                    <option>Standard Shipping: Small to Medium</option>
                    <option>Freight: Oversized Items</option>
                    <option>Local Pickup Only: Sell to buyers near you</option>
                  </select>
                  <div className="col-6">
                    <h2 className="quantity-title">Package Weight</h2>
                    <div className="shipping-container">
                      <input className="quantity-input" type="number" placeholder="Weight" name="title" id="title"  value={productData.weight}
            onChange={(e) => setProductData({ ...productData, weight: e.target.value})}/>
                      <p>lbs.</p>
                    </div>
                  </div>
                </div>
                <div className="button-container">
                {isValidData.notValid === true && <p className="warning-title">{isValidData.type === "photo" ? "Please insert the photo" : isValidData.type === "currency" ?  "Please select the currency" : isValidData.type === "shipping_method" ? "Please select the shipping method" : "Please type the " + isValidData.type}</p>}
                  <button className="sell-btn" type="submit">Submit Product</button>
                  <button className="clear-btn" onClick={() => clear()} type="button">Clear</button>
                </div>
                
              </div>
            </form></div>

          }

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
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
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

export default SellDetails;