import React from 'react';
import { useContext, useState } from "react";
import { RecipeContext } from '../../context/RecipeContext';
import RecipeItem from './RecipeItem';
import './AddRecipe.css';
import { Instruction } from '../../types/types';

const AddRecipe = () => {
  const { recipes } = useContext(RecipeContext);
  const [error, setError] = useState<string | string[]>("");
  const [newInstruction, setNewInstruction] = useState<Instruction>({ text: '', image: null });
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    time: '',
    image: null,
    instructions: [] as Instruction[],
    cuisine: '',
  });

  // Function to close the error box
  const closeErrorBox = () => {
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      const response = await fetch("http://localhost:8080/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.error(response)
        console.error("Failed to post!", formData);
      } else {
        console.log("Form submitted", formData);
      }
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

  const handleAddInstruction = () => {
    if (newInstruction.text || newInstruction.image) {
      setFormData({
        ...formData,
        instructions: [...formData.instructions, newInstruction],
      });
      // Reset the newInstruction state
      setNewInstruction({ text: '', image: null });
    }
  };

  const handleInstructionFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setNewInstruction({
        ...newInstruction,
        image: files[0],
      });
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0], // Store the selected file
      });
    }
  }

  // Handle changes for the instruction text input
  const handleInstructionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewInstruction({
      ...newInstruction,
      text: value,
    });
  };

  //Handle remove instruction
  const handleRemoveInstruction = (index: number) => {
    const updatedInstructions = formData.instructions.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      instructions: updatedInstructions,
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
            <p className='time-unit'>minutes</p>
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
          <div>
            <label className='required instr-label'>Instructions</label>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="instr-list">
                <span>Step {index + 1}: {instruction.text}</span>
                {instruction.image && (
                  <div>
                    <img
                      src={URL.createObjectURL(instruction.image)}
                      alt={`Instruction ${index + 1}`}
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveInstruction(index)}
                  className="remove-instruction-button"
                >
                  ❌
                </button>
              </div>
            ))}
            <div className='instr-input'>
              <input
                type="text"
                name="instructionText"
                value={newInstruction.text}
                onChange={handleInstructionTextChange}
                placeholder="Add instruction step with image"
              />
              <br />
              <input
                type="file"
                name="instructionImage"
                accept="image/*"
                id="instructionImage"
                onChange={handleInstructionFileChange}
              />
              <br /> <br />
              <button type="button" onClick={handleAddInstruction} id='addRecipe-button'>Add Instruction</button>
            </div>
          </div>

          <div className="form-group">
            <label className='required' id='resultImage-label'>Final results image</label>
            <input
              type="file"
              name="image"
              id = "resultImage-inpt"
              onChange={handleFileChange}
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
              <button className="edit-button" onClick={closeErrorBox} id='addRecipe-button'>
                Edit
              </button>
            </div>)}
          <div className="form-actions">
            <button type="button" className='cancel' id='addRecipe-button'>Cancel</button>
            <button type="submit" id='addRecipe-button'>Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;