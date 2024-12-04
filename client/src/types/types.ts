export type GoogleCredentialResponse = {
  credential: string;
};

export type Recipe = {
  id: string;
  userID: string;
  title: string;
  ingredients: string;
  estimate: number;
  cuisine: string;
  result_img: string;
  time: string //The time the recipe was posted
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  picture: string
  isGuest?: boolean;
}

export type Instruction = {
  text: string;
  image: File | null;
}