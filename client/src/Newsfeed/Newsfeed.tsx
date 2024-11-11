import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Home from '../components/home/Home';
import RecipeList from '../components/recipes/RecipeList';
import RecipeDetail from '../components/recipes/RecipeDetail';
import { Route, Router, Routes } from "react-router-dom";
import './Newsfeed.css'

const Newsfeed = () => {
    return(
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<RecipeList />} />
                <Route path="/recipes/:id" element={<RecipeDetail />} />
            </Routes>
        </div>
    );
}

export default Newsfeed;