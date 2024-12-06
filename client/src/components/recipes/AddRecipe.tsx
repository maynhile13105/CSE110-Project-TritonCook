import React from 'react';
import { useState } from "react";
import './AddRecipe.css';
import { Instruction } from '../../types/types';
import { Link, useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [error, setError] = useState<string | string[]>("");
  const [newInstruction, setNewInstruction] = useState<Instruction>({ text: '', image: null });
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    time: '',
    result_img: null,
    instructions: [] as Instruction[],
    cuisine: '',
  });

  const [isTitleRmpty, setIsTitleRmpty] = useState(false);
  const [isIngredientsEmpty, setIsIngredientsEmpty] = useState(false);
  const [isTimeEmpty, setIsTimeEmpty] = useState(false);
  const [isCuisineEmpty, setIsCuisineEmpty] = useState(false);

  // Function to close the error box
  const closeErrorBox = () => {
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorFields: string[] = [];

    // Check for missing fields and build the error message
    // if (!formData.title) {
    //   errorFields.push("Title");
    // }
    if (!formData.title.trim()) {
      setIsTitleRmpty(true);
    } else {
      setIsTitleRmpty(false);
    }

    // if (!formData.ingredients) {
    //   errorFields.push("Ingredients");
    // }
    if (!formData.ingredients.trim()) {
      setIsIngredientsEmpty(true);
    } else {
      setIsIngredientsEmpty(false);
    }

    // if (!formData.time) {
    //   errorFields.push("Estimated time");
    // }
    if (!formData.time.trim()) {
      setIsTimeEmpty(true);
    } else {
      setIsTimeEmpty(false);
    }
    
    // if (!formData.cuisine) {
    //   errorFields.push("Cuisine");
    // }
    if (!formData.cuisine.trim()) {
      setIsCuisineEmpty(true);
    } else {
      setIsCuisineEmpty(false);
    }

    if (!formData.result_img) {
      errorFields.push("Final results image");
    }

    if (formData.instructions.length === 0 && !newInstruction.text) {
      errorFields.push("Instructions");
    }

    // If there are any missing fields, build the error message
    if (errorFields.length > 0) {
      setError(errorFields);
      return;
    }
    
    try {
      const formDataToSend = new FormData();
  
      // Append fields to `FormData`
      formDataToSend.append("title", formData.title);
      formDataToSend.append("ingredients", formData.ingredients);
      formDataToSend.append("estimate", formData.time);
      formDataToSend.append("cuisine", formData.cuisine);
  
      // Append the final image file
      if (formData.result_img) {
        formDataToSend.append("result_img", formData.result_img);
      }
  
      // Append instruction steps, including images (if any)
      formData.instructions.forEach((instruction, index) => {
        formDataToSend.append(`instructions[${index}][description]`, instruction.text);
        if (instruction.image) {
          formDataToSend.append(`instructionImages[${index}]`, instruction.image);
        }
      });
  
      const response = await fetch("http://localhost:8080/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // No "Content-Type" header; `fetch` will automatically set it for `FormData`.
        },
        body: formDataToSend,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to post!", errorData);
        setError(["Failed to post the recipe. Please try again."]);
      } else {
        const responseData = await response.json();
        console.log("Form submitted successfully", responseData);
        // Navigate to home after successful submission
        navigate('/home');
      }
    } catch (err) {
      console.error("Error submitting the form:", err);
      setError(["An unexpected error occurred. Please try again later."]);
    }

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setIsTitleRmpty(!value.trim());
    }

    if (name === 'ingredients') {
      setIsIngredientsEmpty(!value.trim());
    }

    if (name === 'cuisine' && value.trim()) {
      setIsCuisineEmpty(false);
    }

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
      // Reset the file input value
      const fileInput = document.getElementById("instructionImage") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ""; // Clear the file input
      }  
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
      console.log("Selected file:", files[0]); // Add this line to check if the file is being selected
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
        <form onSubmit={handleSubmit} noValidate className='addRecipe-form'>
          <div className="form-group">
            <label className='required'>Title</label>
            <div className='input-and-alert'>
              <input
                type="text"
                name='title'
                value={formData.title}
                onChange={handleChange}
                placeholder='What do you have in mind?'
                required
              />
              {isTitleRmpty && (
                <div className="alert">
                  <img src="/images/warning.svg" alt="Warning" className="alert-icon"/>
                  Title is missing!
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className='required'>Ingredients</label>
            <div className='input-and-alert'>
              <input
                value={formData.ingredients}
                name="ingredients"
                onChange={handleChange}
                placeholder="Use a comma to separate ingredients"
                required
              />
              {isIngredientsEmpty && (
                <div className="alert">
                  <img src="/images/warning.svg" alt="Warning" className="alert-icon"/>
                  Ingredients cannot be empty!
                </div>
              )}
              {/* Green hint below the input */}
              <div className='tips'>
                Tips: Use "," for separating multiple ingredients.
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className='required'>Estimated Time</label>
            <div className='input-and-alert'>
              <div className='time-input-and-unit'>
                <input
                  value={formData.time}
                  name="time"
                  onChange={handleChange}
                  placeholder='Amount'
                  required
                  id='time-input'
                  type="number"
                />
                <div className='time-unit'>minutes</div>
              </div> 
              {/* Green hint below the input */}
              <div className='tips'>
                Tips: Enter a number.
              </div>
            {isTimeEmpty && (
              <div className="alert">
                <img src="/images/warning.svg" alt="Warning" className="alert-icon" />
                Estimated Time is missing!
              </div>
            )}
            </div>
          </div>
          <div className="form-group">
            <label className='required'>Cuisine</label>
            <div className='input-and-alert'>
              <input
                value={formData.cuisine}
                name="cuisine"
                onChange={handleChange}
                placeholder='Type a Cuisine (e.g., Italian, Chinese)'
                required
              />
              {isCuisineEmpty && (
                <div className="alert">
                  <img src="/images/warning.svg" alt="Warning" className="alert-icon" />
                  Country/Origin is missing!
                </div>
              )}
            </div>
          </div>
          <div>
            <label className='required instr-label'>Instructions</label>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="instr-list">
                <div className='instr-img'>
                  <div className='inst'>Step {index + 1}: {instruction.text}</div>
                  {instruction.image && (
                    <div>
                      <img
                        src={URL.createObjectURL(instruction.image)}
                        alt={`Instruction ${index + 1}`}
                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </div>
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
              {error.includes("Instructions") && (
              <div className="alert">
                <img src="/images/warning.svg" alt="Warning" className="alert-icon" />
                Instructions cannot be empty!
              </div>
            )}
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
              name="result_img"
              id = "resultImage-inpt"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-actions">
            <Link to='/home'>
              <button type="button" className='cancel' id='addRecipe-button'>Cancel</button>
            </Link>
            <button type="submit" id='addRecipe-button'>Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;