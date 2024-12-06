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

    setUserProfile({
      id: "",
      name: "",
      email: "",
      picture: "",
      isGuest: true,
    });

    setFavoriteRecipes([]);
    setLikedRecipes([]);
    setToken("");
  };

  return (
    <li className="logout">
      <Link to="/" onClick={handleLogout} style={{textDecoration:"none"}}>
        <button className="login-button" style={{display:"flex", flexDirection:"column"}} >
          <img src="/images/logout.svg" alt="logout" style={{width: '100px'}}/>
          <span style={{fontSize:"20px"}}>Log out</span>
        </button>
      </Link>
    </li>
  );
};

export default Logout;
