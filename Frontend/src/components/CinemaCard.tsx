import "../css/CinemaCard.css";
import { type Media } from "../types";
import { Link } from "react-router-dom";

const CinemaCard: React.FC<Media> = ({
  id,
  title,
  name,
  poster_path,
  media_type,
  release_date,
  first_air_date,
}) => {
  //const genreNames = genreMap(genre_ids);

  const date = release_date || first_air_date;

  const handle = title || name;
 
  const cleanName = handle.replace(/\s+/g, "-").toLowerCase();

  const mediaIdent = `${id}-${cleanName}`  

  return (
    <div className="cinema_card">
      <Link id={handle} to={`/${media_type}/${mediaIdent}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={handle}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/500x750?text=No+Image";
          }}
        />
        <div className="card_info">
          <h3>{handle}</h3>
          {/* <p>Rating: {vote_average} ⭐</p> */}
          {/* <p>Genre: {genreNames.join(', ')}</p> */}
          <p>{date ? `Released: ${date}` : `Aired: ${date}`}</p>
          {/* {runtimeText && <p>{runtimeText}</p>}
        {truncatedOverview && <p>{truncatedOverview}</p>} */}
        </div>
      </Link>
    </div>
  );
};

export default CinemaCard;
