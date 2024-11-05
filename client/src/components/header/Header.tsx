import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>TC</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
      </nav>
    </header>
  );
};

export default Header;