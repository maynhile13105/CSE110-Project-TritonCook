import React, { useEffect, useState } from "react";
import RecipeItem from "../recipes/RecipeItem"; // Reusing the existing RecipeItem component
import { fetchDisplayedRecipes } from "../../utils/displayedRecipes-utils"; // Fetch recipes utility
import { Recipe } from "../../types/types"; // Recipe type for consistency
import { useLocation } from "react-router-dom";
import "../recipes/RecipeList.css"; // Reuse the RecipeList styles
import "./ResultsPage.css";
import { useNavigate } from 'react-router-dom';

const ResultsPage: React.FC = () => {
  const [sortedRecipes, setSortedRecipes] = useState<Recipe[]>([]); // Store sorted recipes
  const location = useLocation(); // To access the search query from navigation state
  const searchQuery = location.state?.searchQuery || ""; // Retrieve the search query
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchDisplayedRecipes(); // Fetch recipes
        const scoredRecipes = calculateMatchScores(fetchedRecipes, searchQuery); // Calculate matches
        console.log("Scored recipes:", scoredRecipes);
  
        if (scoredRecipes.length === 0) {
          // Show pop-up if no matches
          navigate('/home/search', { state: { noMatchesFound: true } });
        } else {
          setSortedRecipes(scoredRecipes); // Display matched recipes
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
  
    loadRecipes();
  }, [searchQuery, navigate]);  
  

  // Function to calculate match scores and sort recipes
  const calculateMatchScores = (recipes: Recipe[], query: string): Recipe[] => {
    if (!query.trim()) return recipes; // If no query, return all recipes.
  
    // Helper function to count matching words
    const getWordMatches = (title: string, query: string): number => {
      const titleWords = new Set(title.toLowerCase().split(/\s+/)); // Split title into lowercase words
      const queryWords = new Set(query.toLowerCase().split(/\s+/)); // Split query into lowercase words
      
      let matchCount = 0;
  
      // Check how many words from the query exist in the title
      queryWords.forEach((word) => {
        if (titleWords.has(word)) {
          matchCount++;
        }
      });
  
      return matchCount; // Return the number of matching words
    };
  
    // Calculate scores and filter recipes
    const scoredRecipes = recipes
      .map((recipe) => ({
        ...recipe,
        matchScore: getWordMatches(recipe.title, query), // Count matching words
      }))
      .filter((recipe) => recipe.matchScore > 0) // Only keep recipes with matches
      .sort((a, b) => b.matchScore - a.matchScore); // Sort by match score in descending order
  
    return scoredRecipes;
  };

  return (
    <div className="results-container">
        {sortedRecipes.map((recipe) => (
            <div className="post-item" key={recipe.id}>
                <RecipeItem currentRecipe={recipe} />
            </div>
        ))}
    </div>
  );
};

export default ResultsPage;

