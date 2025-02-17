import { createContext, useState, useEffect } from "react";
import axios from "axios"

export const Store = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "https://foody-backend-tw5c.onrender.com" 
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([]);



    const addToCart = async (itemId) =>{
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId]:1}))
        }else{
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url + "/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) =>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId}, {headers: {token}});
        }
    }

    const getTotalCartAmount = () =>{
        let ans = 0;
        for(const id in cartItems){
            let x = food_list.find((product) => product._id == id);
            if(x){
                ans += x.price * cartItems[id];
            }
        }
        return ans;
    }


    
    const fetchFoodList = async()=>{
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
        console.log(response.data.data)

    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        // console.log(response.data.data)
        setCartItems(response.data.data || {})
    }

    useEffect(()=>{
        async function loadData() { 
            if(localStorage.getItem("foodyToken")){
                setToken(localStorage.getItem("foodyToken"));
                await loadCartData(localStorage.getItem("foodyToken"))
            }
            await fetchFoodList()
        }
        loadData();
    },[])

    const value = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    }
    return (
        <Store.Provider value = {value}>
            {props.children}
        </Store.Provider>
    )
}

export default StoreContextProvider