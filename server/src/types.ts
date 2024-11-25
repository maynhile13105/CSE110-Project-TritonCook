export type Recipe = {
  id: string;
  userID: string;
  title: string;
  ingredients: string;
  estimate: string;
  cuisine: string;
  result_img: string;
  time: string //The time the recipe was posted
};


export type Profile = {
  id: string;
  name: string;
  email: string;
  picture: string
}