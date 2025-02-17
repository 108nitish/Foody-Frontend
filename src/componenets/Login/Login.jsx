import React, { useContext, useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';
import { Store } from '../../context/storeContext.jsx';
import { toast } from 'react-toastify';
import axios from "axios";

const Login = ({ setShowLogin }) => { 
    const [currState, setCurrState] = useState("Sign Up");
    const [data, setData] = useState({ name: "", email: "", password: "" });
    const { url, setToken } = useContext(Store);

    const onChangeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let nurl = url + (currState === "Login" ? "/api/user/login" : "/api/user/register");

        try {
            const response = await axios.post(nurl, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("foodyToken", response.data.token);
                setShowLogin(false);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong! Try again.");
        }
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input name="name" type="text" onChange={onChangeHandler} value={data.name} placeholder="Your name" required />
                    )}
                    <input name="email" type="email" onChange={onChangeHandler} value={data.email} placeholder="Your email" required />
                    <input name="password" type="password" onChange={onChangeHandler} value={data.password} placeholder="Your Password" required />
                </div>
                <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>

                {currState === "Sign Up"
                ?<div className="login-popup-condition">
                    <label>
                        <input type="checkbox" required /> I agree to the terms and conditions.
                    </label>
                </div>:""}
                 
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>}
            </form>
        </div>
    );
};

export default Login;
