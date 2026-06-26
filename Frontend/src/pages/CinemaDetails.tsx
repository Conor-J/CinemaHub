import { getCinemaDetails } from "../services/apiRequests";
import "../css/CinemaDetails.css";
import "../css/Globe.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DetailsBanner from "../components/DetailsBanner";
import LoadingPlaceholder from "../components/LoadingPlaceholder";

const CinemaDetails = () => {
  const { mediaType, mediaIdent } = useParams<{
    mediaType?: "movie" | "tv";
    mediaIdent?: string;
  }>();

  const { data: details, isLoading, error } = useQuery ({
    queryKey: ['cinemaDetails', mediaType, mediaIdent],

    queryFn: () => getCinemaDetails(mediaType!, mediaIdent!),

    enabled: !!mediaType && !!mediaIdent,
  });

  if (isLoading) return <div className="loading_wrapper"><p>Loading details...</p></div>
  if (error || !details) return <div className="error_wrapper"><p>Error retrieving details</p></div>

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
