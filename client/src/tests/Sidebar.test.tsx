import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../components/Navbar/Sidebar';
describe('Sidebar Component', () => {
  const renderSidebar = () =>
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    //Sidebar Tests
    it('renders all buttons with icons', () => {
        renderSidebar();
        expect(screen.getByText('Profile')).toBeInTheDocument(); //fix User Icon later

        expect(screen.getByText('Favorites')).toBeInTheDocument();
        expect(screen.getByAltText('favoriteIcon')).toBeInTheDocument();

        expect(screen.getByText('Friends')).toBeInTheDocument();
        expect(screen.getByAltText('friendsIcon')).toBeInTheDocument();

        expect(screen.getByText('Filter')).toBeInTheDocument();
        expect(screen.getByAltText('filterIcon')).toBeInTheDocument();
      });

    //Dropdown Tests
    it('shows dropdown container when filter button is clicked', () => {
        renderSidebar();
    
        expect(screen.queryByTestId('dropdown-container')).not.toBeInTheDocument();
    
        fireEvent.click(screen.getByTestId('filter-button'));
    
        expect(screen.getByTestId('dropdown-container')).toBeInTheDocument();
      });

    it('closes the currently open popup when a different popup is opened', () => {
        renderSidebar();
      
        fireEvent.click(screen.getByTestId('filter-button'));
      
        fireEvent.click(screen.getByText('Ingredients'));
        expect(screen.getByTestId('ingredients-popup')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Estimated Time'));

        expect(screen.queryByTestId('ingredients-popup')).not.toBeInTheDocument();
    
        expect(screen.getByTestId('time-popup')).toBeInTheDocument();
      
        fireEvent.click(screen.getByText('Cuisine'));
      
        expect(screen.queryByTestId('time-popup')).not.toBeInTheDocument();
      
        expect(screen.getByTestId('cuisine-popup')).toBeInTheDocument();
      });
    
    //Ingredients Tests
    it('shows ingredients popup when "Ingredients" is clicked', () => {
        renderSidebar();
    
        fireEvent.click(screen.getByTestId('filter-button'));
   
        expect(screen.getByTestId('dropdown-container')).toBeInTheDocument();
   
        fireEvent.click(screen.getByText('Ingredients'));
    
        expect(screen.getByTestId('ingredients-popup')).toBeInTheDocument();
      });

    it('displays selected ingredient below the "Ingredients" section', () => {
        renderSidebar();
    
        fireEvent.click(screen.getByTestId('filter-button'));
    
        fireEvent.click(screen.getByText('Ingredients'));
    
        expect(screen.getByTestId('ingredients-popup')).toBeInTheDocument();
    
        fireEvent.click(screen.getByText('Tomato', {selector: '.ingredientspopup'} ));
    
        expect(screen.getByText('Tomato', { selector: '.selectedingredienttext' })).toBeInTheDocument();
    
        expect(screen.getByText('×', { selector: '.removeingredient' })).toBeInTheDocument();
      });

    it('filters ingredients based on search input', () => {
        renderSidebar();
        fireEvent.click(screen.getByTestId('filter-button'));

        fireEvent.click(screen.getByText('Ingredients'));

        expect(screen.getByTestId('ingredients-popup')).toBeInTheDocument();
      
        const allIngredients = ['Tomato', 'Chicken', 'Lettuce', 'Beef', 'Fish', 'Onion'];
        allIngredients.forEach((ingredient) => {
          expect(screen.getByText(ingredient, { selector: '.ingredientspopup' })).toBeInTheDocument();
        });
      
        const searchInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'Tom' } });

        expect(screen.getByText('Tomato', { selector: '.ingredientspopup' })).toBeInTheDocument();
        allIngredients
          .filter((ingredient) => ingredient !== 'Tomato')
          .forEach((ingredient) => {
            expect(screen.queryByText(ingredient, { selector: '.ingredientspopup' })).not.toBeInTheDocument();
          });

        fireEvent.change(searchInput, { target: { value: '' } });
      
        allIngredients.forEach((ingredient) => {
          expect(screen.getByText(ingredient, { selector: '.ingredientspopup' })).toBeInTheDocument();
        });
      });

    //Estimated Time Tests
    it('shows time popup when "Estimated Time" is clicked', () => {
        renderSidebar();
      
        fireEvent.click(screen.getByTestId('filter-button'));
      
        fireEvent.click(screen.getByText('Estimated Time'));
 
        expect(screen.getByTestId('time-popup')).toBeInTheDocument();
      });

    it('displays selected time option below the "Estimated Time" section', () => {
        renderSidebar();
      
        fireEvent.click(screen.getByTestId('filter-button'));

        fireEvent.click(screen.getByText('Estimated Time'));
      
        fireEvent.click(screen.getByText('<30 minutes'));
    
        expect(screen.getByText('<30 minutes', { selector: '.selectedtimetext' })).toBeInTheDocument();
      
        expect(screen.getByText('×', { selector: '.removetime' })).toBeInTheDocument();
      });

    it('closes time popup when a time option is chosen', () => {
        renderSidebar();
        fireEvent.click(screen.getByTestId('filter-button'));

        fireEvent.click(screen.getByText('Estimated Time'));
      
        expect(screen.getByTestId('time-popup')).toBeInTheDocument();
      
        fireEvent.click(screen.getByText('<20 minutes'));
      
        expect(screen.queryByTestId('time-popup')).not.toBeInTheDocument();
      });

      //Cuisine Tests
    it('shows cuisine popup when "Cuisine" is clicked', () => {
        renderSidebar();
      
        fireEvent.click(screen.getByTestId('filter-button'));
      
        fireEvent.click(screen.getByText('Cuisine'));
      
        expect(screen.getByTestId('cuisine-popup')).toBeInTheDocument();
      });

    it('closes cuisine popup when a cuisine option is selected', () => {
        renderSidebar();
      
        fireEvent.click(screen.getByTestId('filter-button'));
      
        fireEvent.click(screen.getByText('Cuisine'));

        expect(screen.getByTestId('cuisine-popup')).toBeInTheDocument();
      
        fireEvent.click(screen.getByText('Mexican'));
      
        expect(screen.queryByTestId('cuisine-popup')).not.toBeInTheDocument();
      });

    it('displays selected cuisine option below the "Cuisine" section', () => {
        renderSidebar();
      
        fireEvent.click(screen.getByTestId('filter-button'));
      
        fireEvent.click(screen.getByText('Cuisine'));
      
        fireEvent.click(screen.getByText('Indian'));
      
        expect(screen.getByText('Indian', { selector: '.selectedcuisinetext' })).toBeInTheDocument();
      
        expect(screen.getByText('×', { selector: '.removecuisine' })).toBeInTheDocument();
      });

    it('filters cuisine options based on search input', () => {
        renderSidebar();

        fireEvent.click(screen.getByTestId('filter-button'));
      
        fireEvent.click(screen.getByText('Cuisine'));
      
        expect(screen.getByTestId('cuisine-popup')).toBeInTheDocument();
      
        const allCuisines = ['American', 'Chinese', 'Indian', 'Japanese', 'Korean', 'Mexican'];
        allCuisines.forEach((cuisine) => {
          expect(screen.getByText(cuisine, { selector: '.cuisinepopup' })).toBeInTheDocument();
        });
      
        const searchInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'Mex' } });
      
        expect(screen.getByText('Mexican', { selector: '.cuisinepopup' })).toBeInTheDocument();
        allCuisines
          .filter((cuisine) => cuisine !== 'Mexican')
          .forEach((cuisine) => {
            expect(screen.queryByText(cuisine, { selector: '.cuisinepopup' })).not.toBeInTheDocument();
          });
      
        fireEvent.change(searchInput, { target: { value: '' } });
      
        allCuisines.forEach((cuisine) => {
          expect(screen.getByText(cuisine, { selector: '.cuisinepopup' })).toBeInTheDocument();
        });
      });
});