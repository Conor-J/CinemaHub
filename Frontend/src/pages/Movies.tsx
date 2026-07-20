import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { data, useParams } from "react-router-dom";
import { type Media } from "../types";
import { getPopularMovies } from "../services/apiRequests";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import CinemaCard from "../components/CinemaCard";
import "../css/Globe.css";

const Movies = () => {

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie", "popular"],
    queryFn: getPopularMovies,
    select: (data) =>
      data.map((movie) => ({
        ...movie,
        media_type: "movie" as const,
      })),
  });

  if (isLoading)
    return (
      <div className="loading_wrapper">
        <p>Loading movies...</p>
      </div>
    );
  if (error || !movies)
    return (
      <div className="error_wrapper">
        <p>Error retrieving movies</p>
      </div>
    );

  // console.log(media_type);
  return (
    <div className="column_wrapper">
      <div className="content_wrapper">
        <div className="column_header">
          <h2>Currently Popular</h2>
        </div>
        <div className="row_wrapper">
          <div className="filter_wrapper">
            <div className="filter_pannel">
              <h3>Filters</h3>
            </div>
            <div className="filter_pannel"></div>
          </div>
          <div className="grid_container">
            {movies.length === 0 ? (
              <LoadingPlaceholder />
            ) : (
              <div className="grid">
                {movies.map((item) => (
                  <CinemaCard key={item.id} {...item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
