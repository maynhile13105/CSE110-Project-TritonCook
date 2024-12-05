import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import userEvent from '@testing-library/user-event';
import { AppContext } from '../context/AppContext';
const mockUserProfile = {
  id: '123',
  name: 'testuser',
  email: 'testuser@example.com',
  picture: '/images/test-profile.png',
};

const mockContextValue = {
  token: 'mock-token',
  setToken: jest.fn(),

  userProfile: mockUserProfile,
  setUserProfile: jest.fn(),

  favoriteRecipes: [],
  setFavoriteRecipes: jest.fn(),

  likedRecipes: [],
  setLikedRecipes: jest.fn(),

  postedRecipes: [],
  setPostedRecipes: jest.fn(),

  newsfeedRecipes: [],
  setNewsfeedRecipes: jest.fn(),
};

describe('Navbar Component', () => {
  const renderNavbar = () =>
    render(
      <AppContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AppContext.Provider>
    );

  it('renders all buttons with icons', () => {
    renderNavbar();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByAltText('notif')).toBeInTheDocument();
    expect(screen.getByAltText('post')).toBeInTheDocument();
    expect(screen.getByAltText('home')).toBeInTheDocument();
    expect(screen.getByAltText('search')).toBeInTheDocument();
    expect(screen.getByAltText('logout')).toBeInTheDocument();
    expect(screen.getByTestId('profile')).toBeInTheDocument();
  });

  it('should navigate to /home when the Home button is clicked', () => {
    renderNavbar();

    expect(screen.getByTestId('home')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('home'));
    expect(window.location.pathname).toBe('/home');
  });

  it('should navigate to /home/search when the Search button is clicked', () => {
    renderNavbar();

    expect(screen.getByTestId('search')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('search'));
    expect(window.location.pathname).toBe('/home/search');
  });

  it('should navigate to /home/add-recipe when the add post button is clicked', () => {
    renderNavbar();
    userEvent.click(screen.getByTestId('post'));
    expect(window.location.pathname).toBe('/home/add-recipe');
  });

  it('should log out when the logout button is clicked', () => {
    renderNavbar();
    userEvent.click(screen.getByAltText('logout'));
    expect(mockContextValue.setToken).toHaveBeenCalledWith('');
    expect(mockContextValue.setUserProfile).toHaveBeenCalledWith({
      id: '',
      name: '',
      email: '',
      picture: '',
      isGuest: true,
    });
    expect(window.location.pathname).toBe('/');
  });

  it('should navigate to the user profile page when the profile button is clicked', () => {
    renderNavbar();
    userEvent.click(screen.getByTestId('profile'));
    expect(window.location.pathname).toBe(`/profile/${mockUserProfile.name}`);
  });

  it('shows notification popup when the notification button is clicked', () => {
    renderNavbar();
    fireEvent.click(screen.getByTestId('notif'));
    expect(screen.getByText(/Notification will be available soon!/i)).toBeInTheDocument();
  });
});