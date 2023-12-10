import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/navbar";
import SearchBar from "../search-bar/search-bar";
import { AuthContext } from "../../context/AuthContextProvider";
import MovieCard from "../movie-card/movie-card";
import "./movies.scss";

const Movies = () => {
  const { searchResults } = useContext(AuthContext);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const getMovies = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWFiYTJkOTkwZjUxOTBhZDIxNDVkYzVmMWUxMTYyMiIsInN1YiI6IjY0YjQ2ZGNhMGU0ZmM4MDEzYjU0ZTlkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FjWzzUSk4_6fOThC1TI4xK93G_u_XUycMrGAQx9mfjY",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=c1aba2d990f5190ad2145dc5f1e11622`,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies(response.results))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <NavBar displayLogout={true} />
      <div className="main-page">
        <SearchBar />
        {searchResults.length && typeof searchResults !== "string" ? (
          <h1 className="mb-4 text-center">Popular Movies</h1>
        ) : null}

        <div className="main-content">
          {searchResults.length !== 0 ? (
            typeof searchResults !== "string" ? (
              searchResults
                .filter((item) => item.poster_path && item.backdrop_path)
                .map((item, i) => {
                  const { id } = item;
                  return (
                    <MovieCard
                      item={item}
                      key={i}
                      onClick={() => navigate(`${id}`)}
                    />
                  );
                })
            ) : (
              <MovieCard item={searchResults} />
            )
          ) : (
            movies.map((item, i) => {
              const { id } = item;
              return (
                <MovieCard
                  item={item}
                  key={i}
                  onClick={() => navigate(`${id}`)}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Movies;
