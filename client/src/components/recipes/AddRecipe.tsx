import React from 'react';
import { useContext, useState } from "react";
import { RecipeContext } from '../../context/RecipeContext';
import RecipeItem from './RecipeItem';
import './AddRecipe.css';

const AddRecipe = () => {
    const { recipes } = useContext(RecipeContext);
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        time: '',
        image: '',
        cuisine: ''
    });

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      console.log(name)
      console.log(value)
      setFormData({
        ...formData,
        [name]: value
      });
    };

    return (
      <div className='outer'>
        <div className='formContainer'>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label className='required'>Title</label>
                  <input
                      type="text"
                      name='title'
                      value={formData.title}
                      onChange={handleChange}
                      placeholder='What do you have in mind?'
                      required
                  />
              </div>
              <div className="form-group">
                <label className='required'>Ingredients</label>
                <input
                    value={formData.ingredients}
                    name="ingredients"
                    onChange={handleChange}
                    placeholder="Use a comma to separate ingredients"
                    required
                />
                </div>
                <div className="form-group">
                <label className='required'>Estimated Time</label>
                <input
                  value={formData.time}
                  name="time"
                  onChange={handleChange}
                  placeholder='Amount'
                  required
                />
                </div>
                <div className="form-group">
                <label className='required'>Cuisine</label>
                <input
                  value={formData.cuisine}
                  name="cuisine"
                  onChange={handleChange}
                  placeholder='Type a Cuisine (e.g., Italian, Chinese)'
                  required
                />
                </div>
                <div className="form-group">
                  <label className='required'>Final results image</label>
                  <input
                    type="file"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className='cancel'>Cancel</button>
                  <button type="button">Post</button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default AddRecipe;