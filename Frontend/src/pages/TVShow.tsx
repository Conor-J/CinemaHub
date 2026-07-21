import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPopularTVShow } from '../services/apiRequests';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import CinemaCard from '../components/CinemaCard';

const TV = () => {
  const {
    data: tvShows,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tv", "popular"],
    queryFn: getPopularTVShow,
    select: (data) =>
      data.map((tvShow) => ({
        ...tvShow,
        media_type: "tv" as const,
      })),
  });

  if (isLoading)
    return (
      <div className="loading_wrapper">
        <p>Loading movies...</p>
      </div>
    );
  if (error || !tvShows)
    return (
      <div className="error_wrapper">
        <p>Error retrieving movies</p>
      </div>
    );

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
            {tvShows.length === 0 ? (
              <LoadingPlaceholder />
            ) : (
              <div className="grid">
                {tvShows.map((item) => (
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

export default TV;