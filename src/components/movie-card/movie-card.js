import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import "./movie-card.scss";

const MovieCard = ({ item }) => {
  const navigate = useNavigate();
  const { search, setSearchResults } = useContext(AuthContext);

  const { poster_path, name, title, release_date, id } = item;

  const handleGoBack = () => {
    navigate("/movies");
    setSearchResults([]);
  };

  if (typeof item === "string") {
    return (
      <div className="no-content text-center pb-5">
        <div className="text-center">
          <div className="text-dark display-5 mb-3">{item}</div>
          <div className="text-muted mb-5">({search})</div>
          <NavLink
            onClick={handleGoBack}
            className="btn btn-primary"
          >
            Go Back
          </NavLink>
        </div>
      </div>
    );
  } else {
    return (
      <NavLink
        onClick={() => navigate(`${id}`)}
        to={id}
      >
        <div className=" card-main">
          <div className="card">
            <img
              className="img-fluid rounded"
              alt="movie poster"
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`}
            />
            <div className="title text-light">{name ? name : title}</div>
            <div className="date text-danger">{release_date.slice(0, 4)}</div>
          </div>
        </div>
      </NavLink>
    );
  }
};

export default MovieCard;
