import useFetch from "../../services/useFetch";
import PodcastEpisodes from "./PodcastEpisodes/PodcastEpisodes";
import PodcastPlayer from "./PodcastPlayer/PodcastPlayer";
import { PodcastStyles } from "../../styles/LayoutStyles";

const Podcast = () => {
  const {
    data: podcast,
    loading,
    error,
  } = useFetch("http://localhost:8080/https://feeds.npr.org/510312/feed.json");

  if (loading) return <p>Loading</p>;
  if (error) throw error;

  return (
    <PodcastStyles>
      <h1>{podcast.title} Podcast</h1>
      <PodcastPlayer />
      <h3>List of Episodes</h3>
      <PodcastEpisodes items={podcast.items} />
    </PodcastStyles>
  );
};

export default Podcast;
