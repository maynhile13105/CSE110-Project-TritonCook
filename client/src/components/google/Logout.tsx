import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext, initialState } from '../../context/AppContext';
const Logout = () => {
  const {setUserProfile} = useContext(AppContext);
  const {setFavoriteRecipes} = useContext(AppContext);
  const { setLikedRecipes} = useContext(AppContext);
  const { setToken} = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserProfile(initialState.userProfile);
    setFavoriteRecipes(initialState.favoriteRecipes);
    setLikedRecipes(initialState.likedRecipes);
    setToken(initialState.token);
  };

  return (
    <li className="logout">
      <Link to="/" onClick={handleLogout}>
        <img src="images/logout.svg" alt="logout" />
      </Link>
    </li>
  );
};

export default Logout;
