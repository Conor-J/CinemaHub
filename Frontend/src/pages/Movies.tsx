import { useState, useEffect } from 'react';
import { getPopularMovies } from '../services/apiRequests';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import CinemaCard from '../components/CinemaCard';
import { type Media } from '../types';

const Movies = () => {
  const [popular, setPopularMovies] = useState<Media[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const data = await getPopularMovies();
        setPopularMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="home-page">
      <h1>🎬 Currently Popular</h1>
      {popular.length === 0 ? (
        <LoadingPlaceholder />
      ) : (
        <a href=''>
          <div className="card-container">
            {popular.map((item) => (
              <CinemaCard key={item.id} {...item} />
            ))}
          </div>
        </a>
      )}
    </div>
  );
};

export default Movies;