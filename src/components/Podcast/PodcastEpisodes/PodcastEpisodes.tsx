import PodcastEpisode from "./PodcastEpisode";
import { PodcastItems } from "../../../models/podcasts.model";

const PodcastEpisodes: React.FC<{ items: PodcastItems[] }> = ({ items }) => {
  return (
    <section>
      {items.map((item) => {
        const { id } = item;
        return <PodcastEpisode key={id} data={item} />;
      })}
    </section>
  );
};

export default PodcastEpisodes;
