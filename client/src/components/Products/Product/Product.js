import React, { Component, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Product = ({product}) => {

    console.log(product)

    const { _id } = product;
    const { ratings } = product; //rating is array with obj now

    const [numberRating, setNumberRating] = useState(0);

    let numberOfRating = 0;

    useEffect(() => {
        if(ratings.length > 1){

            ratings.map((obj) => {
                numberOfRating = numberOfRating + obj.rating;

            }) 

            let afterRating = numberOfRating / ratings.length;

            let resultRating = Math.round(afterRating*2)/2; //Rounding to 0.5
            setNumberRating(resultRating);
            //obj consist of id and rating

        }else
        {

            if(ratings.length > 0){
                setNumberRating(ratings[0].rating)
            }

        }

    }, [ratings])

    return (
        <div class="col-4">
            <div className="img-storage">
                <Link to={`/product-details/${_id}`}><img src={product.selectedFile[0]} alt="" /></Link>
            </div>
                
                <Link to={`/product-details/${_id}`}><h4>{product.title}</h4></Link>
                    {numberRating ? 
                    <div className="rating">
                        
                        {/* {
                            starArr.map((i) => {
                                return <i className="fa fa-star" key={i}></i>
                            })

                        } */}
                        {/* {
                            numberRating % 1 !== 0 && <i class="fa fa-star-half-o"></i>
                        } */}
                        {/* {
                            emptyStarArr.map((i) => {
                                return <i className="fa fa-star-o"></i>
                            })

                        } */}
                        {(() => {
                            let td = [];
                            for (let i = 0; i < (Math.floor(numberRating)); i++) {
                            td.push(<i className="fa fa-star" key={i}></i>);
                            }
                            return td;
                        })()}

                        {
                            numberRating % 1 !== 0 && <i class="fa fa-star-half-o"></i>
                        }

                        {(() => {
                            let td = [];
                            for (let i = 0; i < (5 - Math.ceil(numberRating)); i++) {
                            td.push(<i className="fa fa-star-o"></i>);
                            }
                            return td;
                        })()}
                        
                    </div>
                     :
                     <div className="rating">
                     <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    </div>
                }
                
                <p>{product.currency === "USD $" ? "$" : product.currency}{product.price}.00</p>
        </div>
    )
}

export default Product;