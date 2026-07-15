import React from "react";
// import "../css/Tailwind.css"
import { type Media } from "../types";
import "../css/DetailsBanner.css";
import "../css/Globe.css";


const DetailsBanner: React.FC<{
  media: Media;
}> = ({ media }) => {
  if (!media) {
    return (
      <div className="details-banner">
        <div className="banner-info">
          <h1 className="banner-title">No media found</h1>
        </div>
      </div>
    );
  }

  const {
    title,
    name,
    poster_path,
    backdrop_path,
    vote_average,
    release_date,
    first_air_date,
    runtime,
    overview,
    genres,
  } = media;

  const formattedTitle = title || name;
  const genreNames = genres?.map((genre) => genre.name);
  const backDrop = `https://image.tmdb.org/t/p/w1280${backdrop_path}`;

  const formattedGenres =
    genreNames.length === 1
      ? genreNames[0]
      : genreNames.length === 2
        ? `${genreNames[0]} and ${genreNames[1]}`
        : `${genreNames.slice(0, -1).join(", ")} and ${genreNames[genreNames.length - 1]}`;

  return (
    <div className="backdrop" style={{ backgroundImage: `url(${backDrop})` }}>
      <div className="banner">
        <div className="banner-image">
          <img
            src={`https://image.tmdb.org/t/p/w1280${poster_path}`}
            alt={formattedTitle}
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/1280x720?text=No+Image";
            }}
          />
        </div>
        <div className="wrapper">
          <div className="banner-info">
            <div className="banner-title-container">
              <h1 className="banner-title ">{formattedTitle}</h1>
              <div className="details">
                <span className="relase">
                  {release_date
                    ? `${release_date}`
                    : first_air_date
                      ? `${first_air_date}`
                      : "No date available"}
                </span>
                <span className="banner-genre">{formattedGenres}</span>
                <span>
                  {runtime > 0 && (
                    <p className="banner-runtime">{runtime} min</p>
                  )}
                </span>
              </div>
            </div>
            {vote_average > 0 && (
              <p className="banner-rating">Rating: {vote_average}</p>
            )}
            {overview && <p className="banner-overview">{overview}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsBanner;
