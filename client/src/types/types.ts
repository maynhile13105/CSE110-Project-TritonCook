export type GoogleCredentialResponse = {
  credential: string;
};

export type Recipe = {
  id: string;
  userID: string;
  title: string;
  ingredients: string;
  estimate: string;
  cuisine: string;
  result_image: string;
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  picture: string
}