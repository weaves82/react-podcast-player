import { createContext, useReducer } from "react";
import { favouriteReducer } from "./favouriteReducer";

import { FavouritesContextInterface } from "./models/favourites.model";

const initialState = {
  favourites: [],
  isLoading: true,
};

export const FavouriteContext = createContext<FavouritesContextInterface>({
  favourites: initialState,
  dispatch: () => null,
});

export const FavouriteProvider: React.FC = ({ children }) => {
  const [favourites, dispatch] = useReducer(favouriteReducer, initialState);

  return (
    <FavouriteContext.Provider value={{ favourites, dispatch }}>
      {children}
    </FavouriteContext.Provider>
  );
};
