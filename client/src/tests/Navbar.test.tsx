import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
describe('Navbar Component', () => {
  it('renders all buttons with icons', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check that each image with the correct alt text is in the document
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByAltText('notif')).toBeInTheDocument();
    expect(screen.getByAltText('post')).toBeInTheDocument();
    expect(screen.getByAltText('home')).toBeInTheDocument();
    expect(screen.getByAltText('search')).toBeInTheDocument();
    expect(screen.getByAltText('logout')).toBeInTheDocument();
    expect(screen.getByAltText('profile')).toBeInTheDocument();
  });
});