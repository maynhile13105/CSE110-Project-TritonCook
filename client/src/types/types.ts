export type Account = {
  username: string;
  password: string;
};

export type GoogleCredentialResponse = {
  credential: string;
};

export type Recipe = {
  id: number;
  title: string;
  ingredients: string;
  estimate: number;
  cuisine: string;
  result_img: string;
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  picture: string
}

export type Instruction = {
  text: string;
  image: File | null;
}