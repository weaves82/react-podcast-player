import { useEffect, useRef, useState } from "react";
import { FetchedPodcast } from "../models/podcasts.model";
import axios from "axios";

const useFetch = (url: string) => {
  const isMounted = useRef(false);
  const [data, setData] = useState<FetchedPodcast>({
    author: {},
    description: "",
    feed_url: "",
    home_page_url: "",
    icon: "",
    items: [],
    next_url: "",
    title: "",
    version: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    isMounted.current = true;
    const fetchData = async () => {
      try {
        const fetchEpisodes = await axios.get(url);
        if (fetchEpisodes.data) {
          if (isMounted.current) {
            setData(fetchEpisodes.data);
          }
        } else {
          throw fetchEpisodes.data;
        }
      } catch (error) {
        if (isMounted.current) {
          setError(error);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };
    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
