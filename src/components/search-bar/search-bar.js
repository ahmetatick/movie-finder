import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";

const SearchBar = () => {
  const { search, setSearch, setSearchResults } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const getMoviesByQuery = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWFiYTJkOTkwZjUxOTBhZDIxNDVkYzVmMWUxMTYyMiIsInN1YiI6IjY0YjQ2ZGNhMGU0ZmM4MDEzYjU0ZTlkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FjWzzUSk4_6fOThC1TI4xK93G_u_XUycMrGAQx9mfjY",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.results.length === 0) {
          setSearchResults("Not found!");
        } else {
          setSearchResults(response.results);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleSearch = () => {
    getMoviesByQuery();
    navigate("/movies");
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container my-3 ">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="search d-flex">
            <input
              type="search"
              className="form-control"
              placeholder="Search a movie, tv show or actor.."
              onChange={(e) => {
                setSearch(e.target.value);
                setInputValue(e.target.value);
              }}
              value={inputValue}
              onKeyPress={handleKeyPress}
              autoFocus
            />
            <button
              className="btn btn-primary mx-2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
