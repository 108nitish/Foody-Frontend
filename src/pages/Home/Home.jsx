import React, { useState } from 'react'
import './Home.css'
import Header from '../../componenets/Header/Header'
import ExploreMenu from '../../componenets/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../componenets/FoodDisplay/FoodDisplay'
const Home = () => {
    const [category, setCategory] = useState("All");
  return (
    <div>
        <Header/> 
        <ExploreMenu category = {category} setCategory = {setCategory}/>
        <FoodDisplay category = {category} />
    </div>
  )
}

export default Home