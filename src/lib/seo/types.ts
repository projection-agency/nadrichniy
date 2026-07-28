export type YoastRobots = {
  index?: string;
  follow?: string;
  "max-snippet"?: string;
  "max-image-preview"?: string;
  "max-video-preview"?: string;
};

export type YoastOgImage = {
  url?: string;
  width?: number;
  height?: number;
  type?: string;
  alt?: string;
};

export type YoastHeadJson = {
  title?: string;
  description?: string;
  robots?: YoastRobots;
  canonical?: string;
  og_locale?: string;
  og_type?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_site_name?: string;
  og_image?: YoastOgImage[];
  article_published_time?: string;
  article_modified_time?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  schema?: Record<string, unknown>;
};

export type YoastMeta = {
  title?: string;
  description?: string;
  focuskw?: string;
  keywords?: string;
  keywordsynonyms?: string;
  metakeywords?: string;
};

export type WpSeoEntity = {
  id?: number;
  slug?: string;
  link?: string;
  yoast_head_json?: YoastHeadJson | null;
  yoast_meta?: YoastMeta | null;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
};

export type YoastGetHeadResponse = {
  json?: YoastHeadJson;
  status?: number;
};
