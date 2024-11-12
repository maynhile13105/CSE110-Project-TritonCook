import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  return (
    <div className='container'>
      <div className='sidebar'>
        <ul className='buttons'>
          <li><Link to='/home/recipes'><img src='images/profile.svg' alt='profileside'/>Profile</Link></li>
          <li><Link to=''><img src='images/favorite.svg' alt='favorite'/>Favorite</Link></li>
          <li><Link to=''><img src='images/friends.svg' alt='friends'/>Friends</Link></li>
          <li><Link to=''><img src='images/filter.svg' alt='filter'/>Filters</Link></li>
        </ul>
      </div>
      <div className='feed'>
        <h1>TritonCook</h1>
        <p>Et ullamco consectetur magna ex enim consequat irure deserunt culpa aliqua pariatur amet duis eu. Dolore labore ex exercitation proident aute cillum laborum anim exercitation nisi Lorem magna. Esse Lorem magna cupidatat anim anim nostrud occaecat ad pariatur nostrud occaecat in exercitation. Veniam eiusmod occaecat occaecat qui occaecat mollit. In esse reprehenderit quis officia in. Culpa elit sunt elit ipsum esse irure sunt.</p>
      </div>
    </div>
  );
};

export default Home;
