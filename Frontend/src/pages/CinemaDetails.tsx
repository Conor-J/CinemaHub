import { getCinemaDetails, getGenreNames } from "../services/apiRequests";
import "../css/CinemaDetails.css";
import "../css/Globe.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { type Media } from "../types";
import DetailsBanner from "../components/DetailsBanner";
import LoadingPlaceholder from "../components/LoadingPlaceholder";

const CinemaDetails = () => {
  const { mediaType, mediaIdent } = useParams<{
    mediaType?: "movie" | "tv";
    mediaIdent?: string;
  }>();

  const URL = `${mediaType}/${mediaIdent}`;

  const [details, setDetails] = useState<Media | null>(null);
  const [genreMap, setGenreMap] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getCinemaDetails(URL);
        setDetails(data);

        // const genreNames = await getGenreNames(mediaType as "movie" | "tv");
        // setGenreMap(genreNames);
      } catch (error) {
        console.error("Error fetching trending:", error);
      }
    };

    fetchDetails();
  }, []);

  return (
    <div className="column_wrapper">
      <div className="cinema-details-page">
        {/* <h1>🎬 {details?.title || details?.name}</h1> */}
        {/* <DetailsBanner media={details} genreMap={genreMap} /> */}
        <DetailsBanner media={details}  />
      </div>
    </div>
  );
};

export default CinemaDetails;
