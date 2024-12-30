import React from 'react';
import { useState, useEffect, useRef} from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import useStyles from "./styles.js";
import { Avatar } from "@material-ui/core";


const Navbar = () => {

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
      const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
      const classes = useStyles();

      const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const location = useLocation()

      const logout = () => {
        dispatch({ type: "LOGOUT"})

        // navigate("/")

        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        if(token){
            const decodedToken = decode(token);

            //decodedToken.exp is in miliseconds so we have to mutiply by 1000
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem("profile")))
    }, [location]);

    const avatar = useRef();
    // const profileContainer = useRef();

    // useEffect(() => {

    // //   avatar.current.on('click touchstart', function(){
    // //     // profileContainer.current.styles.maxHeight = "200px";
    // // });

    // avatar.current.addEventListener('tap', () => {
    //   alert('Mobile click / Tap');
    //   console.log("Mobile clicked")
    // });

    // }, [])

    return (
        <div className="navbar">
                <div className="logo">
                  <a href="index.html"><img src={images["logo.png"]} width="125px" alt="logo"/></a>
                </div>
                <nav>
                  <ul id="MenuItems">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/sell">Sell</Link></li>
                  </ul>
                </nav>
                <Link to="/cart"><img src={images["cart.png"]} width="30px" height="30px" /></Link>
                {user ? 
                <div className="profile">
                    <Avatar className={classes.purple} alt={user.result.firstName ? user.result.firstName : user.result.name} src={user.result.picture} onTouchStart={() => {return showProfile()}}>{user.result.firstName ? user.result.firstName.charAt(0) : user.result.name.charAt(0)}</Avatar>
                    <div className="profile-container" id="profile-container">
                    <p>{user.result.firstName ? user.result.firstName : user.result.name}</p>
                    <span className="logout-btn" onClick={() => logout()}>Logout</span>
                    </div>
                </div>
                
                : <Link to="/account"><span className="sign-in-btn">Sign In</span></Link>}

                <img src={images["menu.png"]} className="menu-icon" alt="menu" onClick={() => menutoggle()} />
                
        </div>
    )

    function menutoggle(){
        let MenuItems = document.getElementById("MenuItems");

        if(MenuItems.style.maxHeight === "300px"){
          MenuItems.style.maxHeight = "0px";
        } else{ 
          MenuItems.style.maxHeight = "300px";
        }
      } 
    
    function showProfile(){
      let profile = document.getElementById("profile-container");

      if(profile.style.maxHeight === "200px"){
        profile.style.padding = "0";
        profile.style.border = "none";
        profile.style.maxHeight = "0px";
      } else{ 

        profile.style.padding = "10px 15px 10px 15px";
        profile.style.border = "2px solid #201f1f";
        profile.style.maxHeight = "200px";
      }
    }
};

export default Navbar;