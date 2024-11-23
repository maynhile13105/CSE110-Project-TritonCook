import React from 'react';
import { useContext, useState } from "react";
import { RecipeContext } from '../../context/RecipeContext';
import RecipeItem from './RecipeItem';
import './AddRecipe.css';

const AddRecipe = () => {
    const { recipes } = useContext(RecipeContext);
    const [error, setError] = useState<string | string[]>("");
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        time: '',
        image: '',
        cuisine: '',
        instructions: ''
    });

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let errorMessage = "";

    let errorFields: string[] = [];
  
    // Check for missing fields and build the error message
    if (!formData.title) {
      errorFields.push("Title");
    }
    if (!formData.ingredients) {
      errorFields.push("Ingredients");
    }
    if (!formData.time) {
      errorFields.push("Estimated time");
    }
    if (!formData.cuisine) {
      errorFields.push("Cuisine");
    }
    if (!formData.image) {
      errorFields.push("Final results image");
    }
    if (!formData.instructions) {
      errorFields.push("Instructions");
    }
  
    // If there are any missing fields, build the error message
    if (errorFields.length > 0) {
      setError([errorMessage, ...errorFields]);
    } else {
      setError("");  // Clear errors
      console.log("Form submitted", formData);
      // Handle successful form submission, like sending data to the server
    }
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    return (
      <div className='outer'>
        <div className='formContainer'>
            <form onSubmit={handleSubmit} noValidate>
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
                  <label className='required'>Instructions</label>
                  <input
                    type="file"
                    name="image"
                    value={formData.instructions}
                    onChange={handleChange}
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
                {error && (
            <div className="error-container">
              <div className="error-header"><span className="error-icon">❌</span>POST UNSUCCESSFUL!</div>
              <div className="error-text">
                The following fields are missing:
                {Array.isArray(error) ? (
                  error.map((msg, index) => <p key={index}>{msg}</p>)
                ) : (
                  <p>{error}</p>
                )}
              </div>
            </div>)}
                <div className="form-actions">
                  <button type="button" className='cancel'>Cancel</button>
                  <button type="submit">Post</button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default AddRecipe;