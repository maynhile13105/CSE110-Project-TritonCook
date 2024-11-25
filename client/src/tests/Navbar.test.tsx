import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
});