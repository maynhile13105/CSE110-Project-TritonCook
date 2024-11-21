import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import userEvent from '@testing-library/user-event';
describe('Navbar Component', () => {
  const renderNavbar = () =>
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

  it('renders all buttons with icons', () => {
    renderNavbar();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByAltText('notif')).toBeInTheDocument();
    expect(screen.getByAltText('post')).toBeInTheDocument();
    expect(screen.getByAltText('home')).toBeInTheDocument();
    expect(screen.getByAltText('search')).toBeInTheDocument();
    expect(screen.getByAltText('logout')).toBeInTheDocument();
    expect(screen.getByAltText('profile')).toBeInTheDocument();
  });

  it('should navigate to /home when the Home button is clicked', async () => {
    renderNavbar();

    const homeLink = screen.getByAltText('home');
    expect(homeLink).toBeInTheDocument();

    const anchor = homeLink.closest('a');
    if (anchor) {
      userEvent.click(anchor);
      expect(window.location.pathname).toBe('/home');
    }
  });

  it('should navigate to /home/search when the Search button is clicked', async () => {
    renderNavbar();

    const searchLink = screen.getByAltText('search');
    expect(searchLink).toBeInTheDocument();

    const anchor = searchLink.closest('a');
    if (anchor) {
      userEvent.click(anchor);
      expect(window.location.pathname).toBe('/home/search');
    }
  });

  
});