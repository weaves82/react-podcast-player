import { Dispatch } from "react";
import { Action } from "../favouriteReducer";

export interface Favourite {
  isLiked: boolean;
  src: string;
  title: string;
}

export interface Favourites {
  favourites: Favourite[];
  isLoading: boolean;
}

export interface FavouritesContextInterfaceDispatch {
  dispatch: Dispatch<Action>;
}

export interface FavouritesContextInterface
  extends FavouritesContextInterfaceDispatch {
  favourites: Favourites;
}
