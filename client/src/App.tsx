import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Newsfeed from "./Newsfeed/Newsfeed"

const App = () => {
  return (
    <div>
      <Newsfeed/>
    </div>
  );
}

export default App;
