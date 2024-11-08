import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Home from '../components/home/Home';
import SearchPage from '../components/recipes/SearchPage';
import { Route, Routes } from "react-router-dom";
import './Newsfeed.css'

const Newsfeed = () => {
    return(
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<SearchPage />} />
            </Routes>
        </div>
    );
}

export default Newsfeed;