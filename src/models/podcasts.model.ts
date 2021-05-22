export interface Podcast {
  title: string;
  url: string;
}

export interface Podcasts {
  podcast: Podcast;
  setPodcast: (obj: Podcast) => void;
}

export interface PodcastItemAttachments {
  duration_in_seconds: number;
  mime_type?: string;
  size_in_bytes?: object;
  url: string;
}

export interface PodcastItems {
  attachments: PodcastItemAttachments[];
  content_html?: string;
  content_text?: string;
  date_published: number;
  id?: string;
  image?: string;
  title: string;
}

export interface FetchedPodcast {
  author?: object;
  description?: string;
  feed_url?: string;
  home_page_url?: string;
  icon?: string;
  items: PodcastItems[];
  next_url?: string;
  title: string;
  version?: string;
}
