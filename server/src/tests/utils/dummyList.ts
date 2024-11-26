import { Profile, Recipe } from "./types";

export const sampleUsers: Profile[] = [
  {
    id: "user1",
    name: "TritonCook1",
    email: "tritoncook1@ucsd.edu",
    picture: "https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?b=1&s=612x612&w=0&k=20&c=Mn_EPBAGwtzh5K6VyfDmd7Q5eJFXSHhGWVr3T4WDQRo="
  },
  {
    id: "user2",
    name: "TritonCook2",
    email: "tritoncook2@ucsd.edu",
    picture: "https://static.vecteezy.com/system/resources/previews/036/804/331/non_2x/ai-generated-assorted-indian-food-on-dark-wooden-background-free-photo.jpg"
  },
  {
    id: "user3",
    name: "TritonCook3",
    email: "tritoncook1@ucsd.edu",
    picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeMAY3Z-205kWN7XF5u2F8GdNrSs6-RvcMOw&s"
  }
];


export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    userID: "user1",
    title: "Spaghetti Aglio e Olio",
    ingredients: "Spaghetti, garlic, olive oil, chili flakes, parsley",
    estimate: "15 mins",
    cuisine: "Italian",
    result_img: "https://bing.com/th?id=OSK.b3b759a18a221874a09a7302de87bfca",
    time: "2024-11-22T10:00:00Z"
  },
  {
    id: "2",
    userID: "user1",
    title: "Vegetable Stir Fry",
    ingredients: "Broccoli, carrots, bell peppers, soy sauce, ginger, garlic",
    estimate: "20 mins",
    cuisine: "Asian",
    result_img: "https://bing.com/th?id=OSK.afe0b0732f41eaf93c37a27c224c434d",
    time: "2024-11-21T14:30:00Z"
  },
  {
    id: "3",
    userID: "user2",
    title: "Avocado Toast",
    ingredients: "Bread, avocado, salt, pepper, lemon juice",
    estimate: "5 mins",
    cuisine: "American",
    result_img: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/12/11/0/FNK_All-the-Avocado-Toast_s4x3.jpg.rend.hgtvcom.616.462.suffix/1450059496131.webp",
    time: "2024-11-22T08:15:00Z"
  },
  {
    id: "4",
    userID: "user2",
    title: "Miso Soup",
    ingredients: "Miso paste, tofu, seaweed, green onions, water",
    estimate: "10 mins",
    cuisine: "Japanese",
    result_img: "https://www.allrecipes.com/thmb/Lrg6D3iYfbcKwe88KfGuUPpaCac=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-RM-13107-miso-soup-ddmfs-3x4-66171fe67e0546f6abf488075339fb13.jpg",
    time: "2024-11-20T18:00:00Z"
  },
  {
    id: "5",
    userID: "user3",
    title: "Classic Pancakes",
    ingredients: "Flour, eggs, milk, sugar, baking powder, butter",
    estimate: "30 mins",
    cuisine: "American",
    result_img: "https://www.allrecipes.com/thmb/SsL-e_0gTwoUa3ek_AVASUXritc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/21014-Good-old-Fashioned-Pancakes-mfs_002-0e249c95678f446291ebc9408ae64c05.jpg",
    time: "2024-11-19T07:00:00Z"
  },
  {
    id: "6",
    title: "Instant Ramen",
    estimate: "< 10 minutes",
    cuisine: "None",
    ingredients: "water, noodles, egg",
    result_img: 'https://static01.nyt.com/images/2018/05/01/dining/01COOKING-PERFECTINSTANTRAMEN1/01COOKING-PERFECTINSTANTRAMEN1-googleFourByThree-v2.jpg',
    userID: "user1",
    time: '"2024-11-10T18:00:00Z"'
  },
  {
    id: "7",
    title: 'Frozen Pizza',
    estimate: " < 20 minutes",
    ingredients: " frozen pizza",
    result_img: 'https://cdn.apartmenttherapy.info/image/upload/v1557254295/k/Photo/Tips/2019-05-You-Should-Be-Grilling-Frozen-Pizza/GrillingFrozenPizzaOption3.jpg',
    userID: "user2",
    cuisine: "Italian",
    time: "2024-11-11T18:00:00Z"
  },
  {
    id: "8",
    title: 'Spaghetti and meatballs',
    estimate: "< 60 minutes",
    ingredients: "pasta, red sauce, meatballs",
    result_img: 'https://www.allrecipes.com/thmb/ZO5edyo6JhS1ZFELyDepR0Y170w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21353-italian-spaghetti-sauce-with-meatballs-DDMFS-4x3-a9a1528b4f06483dbec38d0c2945c378.jpg',
    cuisine: "Italian",
    userID: "user1",
    time: "2024-11-12T18:00:00Z"
  },
  {
    id: "9",
    title: 'Crispy Fried Chicken',
    estimate: '> 60 minutes',
    ingredients: "flour, corn starch, chicken thighs",
    result_img: 'https://www.allrecipes.com/thmb/s0mJbUaWhT4cvgMRK28grMkUXcU=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8805-CrispyFriedChicken-mfs-3x2-072-d55b8406d4ae45709fcdeb58a04143c2.jpg',
    cuisine: "Korean",
    userID: "user3",
    time: "2024-11-13T18:00:00Z"
  },
  {
    id: "10",
    title: 'Healthy Salad',
    estimate: "< 20 minutes",
    ingredients: "lettuce, eggs, avocado, salad dressing",
    result_img: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/04/Cobb-Salad-4-1.jpg',
    cuisine: "Asian-American",
    userID: "user2",
    time: "2024-11-13T18:00:00Z"
  },

];
