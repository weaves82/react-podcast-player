import { useContext } from "react";
import { PodcastContext } from "../../../podcastContext";
const PodcastPlayer: React.FC = () => {
  const { podcast } = useContext(PodcastContext);

  return (
    <figure>
      <figcaption>{podcast.title}</figcaption>
      <audio controls src={podcast.url} data-testid="podcast-player">
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </figure>
  );
};

export default PodcastPlayer;
