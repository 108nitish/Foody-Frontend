import React, { useContext } from 'react'
import './Cart.css'
import { Store } from '../../context/storeContext'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"

const Cart = () => {
  const {token, cartItems, food_list, removeFromCart, getTotalCartAmount, url} = useContext(Store);

  const navigate = useNavigate();

  const helper = ()=>{
    if(!token){
        toast.error("LOG-IN First") 
    }else if(getTotalCartAmount() === 0){
        toast.error("Selects items for cart.")
        navigate("/")
    }else{
        navigate("/order")
    }
  }

  return ( 
    <div className='cart'>
        <div className='cart-items'>
          <div className='cart-items-title'>
            <p>Itens</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br/>
          <hr/>
          {
            food_list.map((item, index)=>{
              if(cartItems[item._id] > 0){
                return (
                  <>
                  <div className='cart-items-title cart-items-item'>
                    <img src={url + "/images/" + item.image} alt=""/>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>{item.price * cartItems[item._id]}</p>
                    <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                  </div>
                  <hr/>
                  </>
                )
              }
            })
          }
        </div>
        <div className='cart-bottom'>
          <div className='cart-total'>
            <h2>Cart Totals</h2>
            <div>
              <div className='cart-total-details'>
                <p>Sub-Total</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr/>
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount()===0?0:20}</p>
              </div>
              <hr/>
              <div className='cart-total-details'>
                <b>Total</b>
                <b>₹{getTotalCartAmount() === 0?0:getTotalCartAmount()+20}</b>
              </div>
            </div>
            <button onClick={helper}>PROCEED TO CHECKOUT</button>
          </div>
          <div className='cart-promocode'>
            <div>
              <p>If you have a promo code, Enter it here..</p>
              <div className='cart-promocode-input'>
                <input type='text' placeholder='promocode'/>
                <button  >Submit</button>
              </div>
            </div>
          </div>
        </div>
    </div>  
  )
}

export default Cart