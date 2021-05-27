import PodcastEpisode from "./PodcastEpisode";
import { PodcastItems } from "../../../models/podcasts.model";

const PodcastEpisodes: React.FC<{ items: PodcastItems[] }> = ({ items }) => {
  return (
    <section>
      {items.length ? (
        items.map((item) => {
          const { id } = item;
          return <PodcastEpisode key={id} data={item} />;
        })
      ) : (
        <p>No episodes found</p>
      )}
    </section>
  );
};

export default PodcastEpisodes;
