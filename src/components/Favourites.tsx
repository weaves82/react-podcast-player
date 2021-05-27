import { FavouriteContext } from "../favouriteContext";
import { useContext, useEffect } from "react";
import {
  getFavouritesActions,
  saveFavouritesActions,
} from "../services/favouriteService";
import { PodcastContext } from "../podcastContext";
import { FavouritesStyles } from "../styles/LayoutStyles";
import { EpisodeTitleStyles } from "../styles/EpisodeStyles";
import {
  Favourite,
  FavouritesContextInterface,
} from "../models/favourites.model";
import { Podcasts } from "../models/podcasts.model";

const Favourites: React.FC = () => {
  const { favourites, dispatch } =
    useContext<FavouritesContextInterface>(FavouriteContext);

  const { setPodcast } = useContext<Podcasts>(PodcastContext);

  useEffect(() => {
    const saveAction = getFavouritesActions();
    saveAction(dispatch);
  }, [dispatch]);

  const hasFavourite = favourites.favourites.find((item) => {
    return item.isLiked === true;
  });

  const onClickHandler = (acc: Favourite) => {
    setPodcast({
      title: acc.title,
      url: acc.src,
    });
  };

  const onClickDeleteHandler = (acc: Favourite) => {
    const favouriteObj = {
      title: acc.title,
      src: acc.src,
      isLiked: false,
    };
    const saveAction = saveFavouritesActions(favouriteObj);
    saveAction(dispatch);
  };

  if (favourites.isLoading) return <p>Loading</p>;

  return (
    <FavouritesStyles>
      <h3>Your Favourites</h3>
      {hasFavourite ? (
        favourites.favourites.reduce((total: JSX.Element[], acc: Favourite) => {
          if (acc.isLiked) {
            total.push(
              <p key={acc.title}>
                <button onClick={(e) => onClickHandler(acc)}>Load</button>
                <EpisodeTitleStyles>{acc.title}</EpisodeTitleStyles>
                <button onClick={(e) => onClickDeleteHandler(acc)}>
                  Delete
                </button>
              </p>
            );
          }
          return total;
        }, [])
      ) : (
        <p>No favourites added</p>
      )}
    </FavouritesStyles>
  );
};

export default Favourites;
