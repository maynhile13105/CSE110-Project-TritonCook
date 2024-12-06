import React, { useEffect, useState } from 'react';
import './RecSearch.css';
import { useNavigate } from 'react-router-dom';
import { addSearchHistory } from "../../utils/history-utils";

interface RecommendationSearchProps {
  searchInput: string;
  database: string[];
  onRecommendationCount: (count: number) => void;
}

const RecSearch: React.FC<RecommendationSearchProps> = ({
  searchInput,
  database,
  onRecommendationCount,
}) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const navigate = useNavigate();

  // Function to find the closest matches
  const findClosestMatches = (input: string, data: string[]): string[] => {
    if (!input.trim()) return [];
    const exactMatches = data.filter((item) =>
      item.toLowerCase() === input.toLowerCase()
    );
    const partialMatches = data.filter(
      (item) =>
        item.toLowerCase().includes(input.toLowerCase()) &&
        !exactMatches.includes(item)
    );
    return [...exactMatches, ...partialMatches].slice(0, 5); // Prioritize exact matches, limit to 5
  };

  // Update recommendations whenever searchInput changes
  useEffect(() => {
    const matches = findClosestMatches(searchInput, database);

    // If no matches, use searchInput as the only recommendation
    if (matches.length === 0 && searchInput.trim()) {
      setRecommendations([searchInput]);
    } else {
      setRecommendations(matches);
    }
  }, [searchInput, database]);

  // Send recommendation count to parent
  useEffect(() => {
    onRecommendationCount(recommendations.length); // Send count to parent
  }, [recommendations, onRecommendationCount]);

  const handleItemClick = async (item: string) => {
    try {
      await addSearchHistory(item); // Save clicked recommendation to the backend
    } catch (error) {
      console.error("Error saving search history:", error);
    }
    // Navigate to the results page with the clicked query
    navigate('/home/results', { state: { searchQuery: item } });
  };

  return (
    <div className={`recommendation-bar expanded`}>
      {/* Render recommendation items */}
      {recommendations.map((item, index) => (
        <div
          key={index}
          className="recommendation-item"
          onClick={() => handleItemClick(item)}
        >
          <div className="recommendation-item-content">
            <img src="/images/searchIcon.svg" alt="Search Icon" />
            {item}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecSearch;
