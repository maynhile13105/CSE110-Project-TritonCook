import { Recipe } from "./types";

export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    userID: "user123",
    title: "Spaghetti Aglio e Olio",
    ingredients: "Spaghetti, garlic, olive oil, chili flakes, parsley",
    estimate: "15 mins",
    cuisine: "Italian",
    result_img: "https://example.com/spaghetti.jpg",
    time: "2024-11-22T10:00:00Z"
  },
  {
    id: "2",
    userID: "user456",
    title: "Vegetable Stir Fry",
    ingredients: "Broccoli, carrots, bell peppers, soy sauce, ginger, garlic",
    estimate: "20 mins",
    cuisine: "Asian",
    result_img: "https://example.com/stirfry.jpg",
    time: "2024-11-21T14:30:00Z"
  },
  {
    id: "3",
    userID: "user789",
    title: "Avocado Toast",
    ingredients: "Bread, avocado, salt, pepper, lemon juice",
    estimate: "5 mins",
    cuisine: "American",
    result_img: "https://example.com/avocado-toast.jpg",
    time: "2024-11-22T08:15:00Z"
  },
  {
    id: "4",
    userID: "user123",
    title: "Miso Soup",
    ingredients: "Miso paste, tofu, seaweed, green onions, water",
    estimate: "10 mins",
    cuisine: "Japanese",
    result_img: "https://example.com/miso-soup.jpg",
    time: "2024-11-20T18:00:00Z"
  },
  {
    id: "5",
    userID: "user456",
    title: "Classic Pancakes",
    ingredients: "Flour, eggs, milk, sugar, baking powder, butter",
    estimate: "30 mins",
    cuisine: "American",
    result_img: "https://example.com/pancakes.jpg",
    time: "2024-11-19T07:00:00Z"
  }
];
