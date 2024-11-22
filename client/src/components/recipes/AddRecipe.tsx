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
        time: 0,
        image: '',

    });
    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { title } = e.target;
        setFormData({
            ...formData
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
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className='required'>Ingredients</label>
                    <input
                        value={formData.ingredients}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className='required'>Estimate Time</label>
                    <input
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className='required'>Final results image</label>
                    <input
                        type="file"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button">
                            Cancel
                        </button>
                        <button type="button" >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRecipe;