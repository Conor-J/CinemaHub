import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getDayTrending } from "../services/apiRequests";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import CinemaCard from "../components/CinemaCard";
import "../css/Globe.css";

const Home = () => {

  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day');
 
  const { data: trending, isLoading, error } = useQuery({
    queryKey: ['trending', timeWindow],
    queryFn: () => getDayTrending(timeWindow),
  });

    if (isLoading)
      return (
        <div className="loading_wrapper">
          <p>Loading details...</p>
        </div>
      );
    if (error || !trending)
      return (
        <div className="error_wrapper">
          <p>Error retrieving trending</p>
        </div>
      );

  return (
    <div className="column_wrapper">
      <div className="column">
        <div className="column_header">
          <h2>Currently Trending</h2>
          <div className="toggle_button">
            <button
              className="button"
              onClick={() => setTimeWindow("day")}
              style={{
                background: timeWindow === "day" ? "#007bff" : "transparent",
                color: timeWindow === "day" ? "black" : "white",
              }}
            >
              <h3>Today</h3>
            </button>
            <button
              className="button"
              onClick={() => setTimeWindow("week")}
              style={{
                background: timeWindow === "week" ? "#007bff" : "transparent",
                color: timeWindow === "week" ? "black" : "white",
              }}
            >
              <h3>This Week</h3>
            </button>
          </div>
        </div>
        {/* Horizontal Scrollable List */}
        <div className="trending_container">
          <div className="scroller">
            {trending.length === 0 ? (
              <LoadingPlaceholder />
            ) : (
              <div className="trending_list">
                {trending.map((item) => (
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

export default Home;
