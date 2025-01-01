import React, { Component, useState, useEffect, useCallback, useMemo } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, updateCartItem } from '../../../actions/cart.js';
import no_product_img from "../../images/cancel.png"


const CartItem = React.memo(({ cartItem }) => {

    const dispatch = useDispatch();
    const {_id} = cartItem;
    const user = JSON.parse(localStorage.getItem("profile"))

    const handleRemove = useCallback((_id) => {
        return dispatch(deleteCartItem(_id, user?.result?._id ? user?.result?._id : user?.result?.sub))

    }, [cartItem])

    const handleUpdate = useCallback((event, _id, cartItem) => {

      return dispatch(updateCartItem(_id, {...cartItem, quantity: event.target.value, subtotal: (cartItem.price * event.target.value)}, user?.result?._id ? user?.result?._id : user?.result?.sub))
  }, [cartItem])

    return (
        <tr>
                  <td>
                    <div className="cart-info">
                      <img style={{border: "1px solid #ff523b", borderRadius: "5px"}}src={cartItem.selectedFile ? cartItem.selectedFile : no_product_img} alt="" />
                      <div>
                        <p className="cart-title">{cartItem.title}</p>
                        <small>Price: {cartItem.currency === "USD $" ? "$" : cartItem.currency}{cartItem.price}.00</small>
                        <br />
                        <p className="cart-remove" onClick={() => {return handleRemove(_id)}}>Remove</p>
                      </div>
                    </div>
                  </td>
                  <td><input type="number" value={cartItem.quantity ? cartItem.quantity : 0} onChange={(event) => {return handleUpdate(event, _id, cartItem)}}/></td>
                  <td>{cartItem.currency === "USD $" ? "$" : cartItem.currency}{cartItem.subtotal}.00</td>
        </tr>
    )
})

export default CartItem;