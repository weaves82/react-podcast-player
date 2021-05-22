import { createContext, useState } from "react";
import { Podcasts } from "./models/podcasts.model";

const initialState = {
  title: "",
  url: "",
};

export const PodcastContext = createContext<Podcasts>({
  podcast: initialState,
  setPodcast: () => null,
});

export const PodcastProvider: React.FC = ({ children }) => {
  const [podcast, setPodcast] = useState(initialState);

  return (
    <PodcastContext.Provider value={{ podcast, setPodcast }}>
      {children}
    </PodcastContext.Provider>
  );
};
