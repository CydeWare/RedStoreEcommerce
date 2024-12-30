// import { CLIENT_ID } from '../Config/Config'
// import dotenv from "dotenv";
// dotenv.config();

import React, { useState, useEffect } from "react" ;
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from 'react-redux';

const Checkout = ({subtotal, total, tax, shipping, cartItems}) => {
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    const user = JSON.parse(localStorage.getItem("profile"))

    let items = []

    cartItems.map((cartItem) => {
        items.push(
            {
                
                name: cartItem.title,
                quantity: cartItem.quantity,
                unit_amount: {
                currency_code: cartItem.currency === "USD $" ? "USD" : cartItem.currency,
                value: cartItem.price
                },
                
            }
        )
    })

    const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;


    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "RedStore",
                    items: items,
                    amount: {
                        currency_code: "USD",
                        value: total,
                        breakdown: {
                            item_total: {
                            currency_code: "USD",
                            value: subtotal
                            },
                            shipping: {
                            currency_code: "USD",
                            value: shipping
                            },
                            tax_total: {
                            currency_code: "USD",
                                value: tax
                            },
                        }
                    },
                    payer: {
                        email_address: user?.result?.email,
                        name: {
                        given_name: user?.result?.firstName ? `${user?.result?.firstName} ${user?.result?.lastName}` : user?.result?.name,
                        surname: user?.result?.firstName ? `${user?.result?.lastName}` : user?.result?.name
                        },
                    }
                },
            ],
        }).then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
        console.log(data);
    };

    useEffect(() => {
        if (success) {
            alert("Payment successful!!");
            console.log('Order successful . Your order id is--', orderID);
        }
    },[success]);

    return (
        <div className="all-form all-form-container">
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>All Products - Redstore </title>
        <link rel="stylesheet" href="style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
        <h1 className="paypal-title" style={{marginTop: "10px", marginBottom: "40px"}}>Choose your payment method:</h1>
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div className="paypal-buttons-storage" style={{ width: "700px"}}>
                
                <PayPalButtons
                    style={{ layout: "vertical"}}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    forceReRender={[subtotal, total, tax, shipping, cartItems ]}
                    onError={onError}
                />
                {ErrorMessage && <p>{ErrorMessage}</p>}
            </div>
        </PayPalScriptProvider>

        </div>
    );
}

export default Checkout