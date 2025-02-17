import React, { useContext} from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Store } from '../../context/storeContext.jsx'

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");
 
    const {getTotalCartAmount, token, setToken} = useContext(Store);
    
    const navigate = useNavigate();

    const logOut = () =>{
        localStorage.removeItem("foodyToken")
        setToken("")
        navigate("/")
    }

  return (
     
    <div className='navbar'>
        <Link to='/'><img src = {assets.logo} alt="" className='logo'/></Link>
        <ul className='navbar-menu'>
            <Link to='/' onClick={()=>setMenu("home")} className={menu ==="home"?"active": ""}>Home</Link>
            <a href="#explore-menu" onClick={()=>setMenu("menu")} className={menu ==="menu"?"active": ""}>Menu</a>
            <a href="#app-download" onClick={()=>setMenu("mobile-app")} className={menu ==="mobile-app"?"active": ""}>Mobile-App</a>
            <a href="#footer" onClick={()=>setMenu("contact-us")} className={menu ==="contact-us"?"active": ""}>Contact Us</a>
        </ul>
        <div className='navbar-right'>
            <img src = {assets.search_icon} />
            <div className = "navbar-search-icon">
                <Link to='/cart'><img src = {assets.basket_icon} alt = ""/></Link>
                <div className={getTotalCartAmount() === 0 ? "" : "dot"} ></div>
            </div>
            {!token? <button onClick={()=>setShowLogin(true)}>Sign-In</button>
            :<div className="navbar-profile">
                <img src={assets.profile_icon} />
                <ul className="nav-profile-dropdown">
                    <li onClick={()=> navigate("/myorders")}><img src={assets.bag_icon} /><p>Orders</p></li>
                    <hr/>
                    <li onClick={logOut}><img src={assets.logout_icon}/><p>Logout</p></li>
                </ul>
            </div>
            }
            
        </div>
    </div>
  )
}

export default Navbar