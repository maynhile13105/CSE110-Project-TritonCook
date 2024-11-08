import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Home from '../components/home/Home';
import RecipeList from '../components/recipes/RecipeList';
import RecipeDetail from '../components/recipes/RecipeDetail';
import { Route, Routes } from "react-router-dom";
import './Newsfeed.css'

const Newsfeed = () => {
    return(
        <div>
            <Navbar />
            <Home />
        </div>
    );
}

export default Newsfeed;