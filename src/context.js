import { createContext } from "react";
const Context = createContext({
  user: null,
  favorites: [],
  groceries: [],
  recipes: [],
  myRecipes: [],
});
export default Context;
