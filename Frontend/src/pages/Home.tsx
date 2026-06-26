import { useState, useEffect } from "react";
import { getDayTrending } from "../services/apiRequests";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import CinemaCard from "../components/CinemaCard";
import { type Media } from "../types";
import "../css/Globe.css";

const Home = () => {
  const [trending, setTrending] = useState<Media[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getDayTrending();
        setTrending(data);
      } catch (error) {
        console.error("Error fetching trending:", error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="column_wrapper">
      <div className="column">
        <div className="column_header">
          <h2>Currently Trending</h2>
            <div className="selector">
              <div className="anchor">
                <h3>Today</h3>
                <div className="background"></div>
              </div>
              <div className="anchor">
                <h3>This Week</h3>
              </div>
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
