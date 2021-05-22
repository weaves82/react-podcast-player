import axios from "axios";
import { Dispatch } from "react";
import { Action } from "../favouriteReducer";
import { Favourites, Favourite } from "../models/favourites.model";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getFavourites() {
  return await axios.get(baseUrl + "people/1");
}

export async function saveFavourites(favourites: Favourite) {
  let updatedFavourites = [];
  const currentFavourites = await axios.get(baseUrl + "people/1");

  if (currentFavourites.data.favourites) {
    const isFavourited = currentFavourites.data.favourites.find(
      (favourite: Favourite) => {
        return favourite.title === favourites.title;
      }
    );
    if (isFavourited) {
      const updatedFavourite = currentFavourites.data.favourites.map(
        (favourite: Favourite) => {
          if (favourite.title === favourites.title) {
            return {
              ...favourite,
              isLiked: favourites.isLiked,
            };
          }
          return favourite;
        }
      );
      updatedFavourites = [...updatedFavourite];
    } else {
      updatedFavourites = [...currentFavourites.data.favourites, favourites];
    }
  } else {
    updatedFavourites.push(favourites);
  }
  await axios.put(baseUrl + "people/1", { favourites: updatedFavourites });
}

export const saveFavouritesActions = (favourites: Favourite) => {
  return async (dispatch: Dispatch<Action>) => {
    await saveFavourites(favourites);
    const updatedFavourites = await getFavourites();
    dispatch({
      type: "fetch",
      payload: updatedFavourites.data,
    });
  };
};

export function getFavouritesActions() {
  return async (dispatch: Dispatch<Action>) => {
    const currentFavourites = await getFavourites();
    dispatch({
      type: "fetch",
      payload: currentFavourites.data,
    });
  };
}
