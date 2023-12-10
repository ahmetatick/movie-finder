import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../navbar/navbar";
import SearchBar from "../search-bar/search-bar";
import React from "react";
import "./movie-details.scss";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const getMovieDetails = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=c1aba2d990f5190ad2145dc5f1e11622&language=en-US`
    )
      .then((res) => res.json())
      .then((res) => setMovie(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMovieDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavBar displayLogout={true} />

      <div className="movie-detail">
        <SearchBar />

        <div className="overview">
          <div className="image">
            <img
              className="rounded shadow-lg p-3 bg-primary"
              src={
                movie.poster_path
                  ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
                  : ""
              }
              alt="movie poster"
            />
          </div>
          <div className="details">
            <p>
              <span className="label text-primary">Overview:</span>{" "}
              {movie.overview}
            </p>

            <p>
              <span className="label text-primary">Release Date:</span>{" "}
              {movie.release_date}
            </p>
            <p>
              <span className="label text-primary">Rate:</span>{" "}
              {movie.vote_average}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
