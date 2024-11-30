import React, { createContext, useState, ReactNode, useContext } from "react";

interface FilterContextProps {
    selectedIngredients: string[];
    setSelectedIngredients: (ingredients: string[]) => void;
    selectedTime: string | null;
    setSelectedTime: (time: string | null) => void;
    selectedCuisine: string | null;
    setSelectedCuisine: (cuisine: string | null) => void;
    appliedFilters: {
        ingredients: string[];
        time: string | null;
        cuisine: string | null;
    };
    setAppliedFilters: (filters: {
        ingredients: string[];
        time: string | null;
        cuisine: string | null;
    }) => void;
  }

  export const FilterContext = createContext<FilterContextProps | undefined>(undefined);

  export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
    
    const [appliedFilters, setAppliedFilters] = useState({
        ingredients: [] as string[],
        time: null as string | null,
        cuisine: null as string | null,
      });
  
    return (
      <FilterContext.Provider
        value={{
            selectedIngredients,
            setSelectedIngredients,
            selectedTime,
            setSelectedTime,
            selectedCuisine,
            setSelectedCuisine,
            appliedFilters,
            setAppliedFilters,
        }}
      >
        {children}
      </FilterContext.Provider>
    );
  };
  
  // custom hook to use the FilterContext
  export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (!context) {
      throw new Error("useFilterContext must be used within a FilterProvider");
    }
    return context;
};
