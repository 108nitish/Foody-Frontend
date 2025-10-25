import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets.js'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={assets.logo} />
                <p>Choose from a diverse menu veaturing a detectable list of dishes made with best ingredient. Our mission is to satisfy your hunger and cravings. Increase you dinning experience, with delicious meal.</p>
                <div className='footer-social-icon'>
                    <img src={assets.facebook_icon} />
                    <img src={assets.twitter_icon} />
                    <img src={assets.linkedin_icon} />
                </div>
            </div>
            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>Get In Touch</h2>
                <ul>
                    <li>+91-11255 32553</li>
                    <li>contact@foody.com</li>
                </ul>
            </div>

        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2025 Foody - All Right Reserved.</p>
    </div>
  )
}


export default Footer
