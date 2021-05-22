import { useContext } from "react";
import { PodcastContext } from "../../../podcastContext";
import {} from "../../../models/podcasts.model";
const PodcastPlayer: React.FC = () => {
  const { podcast } = useContext(PodcastContext);

  return (
    <figure>
      <figcaption>{podcast.title}</figcaption>
      <audio controls src={podcast.url}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </figure>
  );
};

export default PodcastPlayer;
