import React, { useEffect, useState } from 'react';
import './RecommendationSearch.css';
import { useNavigate } from 'react-router-dom';

interface RecommendationSearchProps {
  searchInput: string;
  database: string[];
  onRecommendationCount: (count: number) => void;
}
  

const RecommendationSearch: React.FC<RecommendationSearchProps> = ({
  searchInput,
  database,
  onRecommendationCount,
}) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const navigate = useNavigate();

  // Function to find the closest matches
  const findClosestMatches = (input: string, data: string[]): string[] => {
    if (!input.trim()) return [];
    return data
      .filter((item) => item.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 5); // Limit to top 5 results
  };

  // Update recommendations whenever searchInput changes
  useEffect(() => {
    const matches = findClosestMatches(searchInput, database);
    setRecommendations(matches);
  }, [searchInput, database]);

  // Send recommendation count to parent
  useEffect(() => {
    onRecommendationCount(recommendations.length); // Send count to parent
  }, [recommendations]);

  const handleItemClick = (item: string) => {
    // Navigate to the posts page with search query
    navigate('/posts', { state: { searchQuery: item } });
  };

  return (
    <div
      className={`recommendation-bar ${recommendations.length > 0 ? 'expanded' : ''}`}>
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

export default RecommendationSearch;
