export type Account = {
  username: string;
  password: string;
};

export type GoogleCredentialResponse = {
  credential: string;
};

export type Recipe = {
  id: number;
  name: string;
  estimate: number;
  ingredients: string[];
  image: string;
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  picture: string
}