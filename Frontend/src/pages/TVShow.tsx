import { useState, useEffect } from 'react';
import { getPopularTVShow } from '../services/apiRequests';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import CinemaCard from '../components/CinemaCard';
import { type Media } from '../types';

const TV = () => {
  const [trending, setPopularTV] = useState<Media[]>([]);

  useEffect(() => {
    const fetchPopularTV = async () => {
      try {
        const data = await getPopularTVShow();
        setPopularTV(data);
      } catch (error) {
        console.error('Error fetching trending:', error);
      }
    };

    fetchPopularTV();
  }, []);

  return (
    <div className="home-page">
      <h1>🎬 Currently Trending</h1>
      {trending.length === 0 ? (
        <LoadingPlaceholder />
      ) : (
        <div className="card-container">
          {trending.map((item) => (
            <CinemaCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TV;