export interface MediaBase {
  id: number;
  title: string;
  name: string;
  original_title?: string;
  genres: Array<{ id: number, name: string }>;
  vote_average: number;
  poster_path: string;
  backdrop_path?: string;
  release_date?: string;
  first_air_date?: string;
  overview?: string;
  runtime: number;
}

export interface Movie extends MediaBase {
  runtime: number;
  media_type: "moive";
  genre_names?: string[];
}

export interface TVShow extends MediaBase {
  last_air_date?: string;
  season_number?: number[];
  number_of_seasons?: number;
  genre_names?: string[];
  media_type: 'tv';
}

export interface CinemaCardProp extends MediaBase {
    media_type: string;
}

export interface searchDetails {
    mediaType: string;
    ident: string;
  }

export interface Genre {
  id: number;
  name: string;
}

export type Media = Movie | TVShow