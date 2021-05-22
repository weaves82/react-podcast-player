import { useContext, useEffect, useState } from "react";
import { FavouriteContext } from "../../../favouriteContext";
import { PodcastContext } from "../../../podcastContext";
import { saveFavouritesActions } from "../../../services/favouriteService";
import {
  EpisodeStyles,
  EpisodeTitleStyles,
  EpisodeDescriptionStyles,
} from "../../../styles/EpisodeStyles";
import { PodcastItems } from "../../../models/podcasts.model";

const PodcastEpisode: React.FC<{ data: PodcastItems }> = (props) => {
  const { favourites, dispatch } = useContext(FavouriteContext);

  const { setPodcast } = useContext(PodcastContext);

  const [open, setOpen] = useState(false);

  const [liked, setLiked] = useState(false);

  const { data } = props;

  const { title, attachments: episodes, date_published, content_text } = data;

  const dateTransformed = new Date(date_published);

  const fullDate = `${dateTransformed.getDate()}-${dateTransformed.getMonth()}-${dateTransformed.getFullYear()}`;

  const durationInSeconds = episodes[0].duration_in_seconds;

  const durationInMinutes = Math.floor(durationInSeconds / 60);

  const duration = durationInSeconds - durationInMinutes * 60;

  const onPlayClickHandler = () => {
    setPodcast({
      title: data.title,
      url: data.attachments[0].url,
    });
  };

  const onShowClickHandler = () => {
    setOpen(!open);
  };

  const onLikeClickHandlerEpisode = () => {
    const favouriteObj = {
      title: title,
      src: episodes[0].url,
      isLiked: !liked,
    };
    setLiked(!liked);

    const saveAction = saveFavouritesActions(favouriteObj);
    saveAction(dispatch);
  };

  const description = {
    display: `${open ? "block" : "none"}`,
  };

  useEffect(() => {
    const hasLikeArray = favourites.favourites.filter((item) => {
      return item.title === title;
    });
    hasLikeArray.length && hasLikeArray[0] && setLiked(hasLikeArray[0].isLiked);
  }, [favourites, title]);

  return (
    <EpisodeStyles>
      <div>
        <button onClick={onShowClickHandler}>
          {open ? "Hide" : "Show"} Description
        </button>
        <EpisodeTitleStyles>
          {title} ({durationInMinutes}:{duration})
        </EpisodeTitleStyles>
        <button onClick={onPlayClickHandler}>Load</button>{" "}
        <button onClick={onLikeClickHandlerEpisode}>
          Like{liked ? "d" : ""}
        </button>
      </div>
      <EpisodeDescriptionStyles style={description}>
        {content_text} - Published ({fullDate})
      </EpisodeDescriptionStyles>
    </EpisodeStyles>
  );
};

export default PodcastEpisode;
