import { Favourites } from "./models/favourites.model";

export type Action = { type: "fetch"; payload: Favourites };

export const favouriteReducer = (state: Favourites, action: Action) => {
  switch (action.type) {
    case "fetch":
      return {
        ...state,
        favourites: action.payload.favourites,
        isLoading: false,
      };
    default:
      return state;
  }
};
