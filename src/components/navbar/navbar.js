import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";

const NavBar = ({ displayLogout }) => {
  const { setIsLoggedIn, setSearch, setSearchResults } =
    useContext(AuthContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSearch("");
    setSearchResults([]);
    localStorage.clear();
  };

  return (
    <nav className="navbar-main navbar bg-primary text-white navbar-expand-lg px-4 mb-0">
      <div className="d-flex justify-content-between w-100">
        <NavLink
          className="navbar-brand text-white px-5"
          onClick={() => setSearchResults([])}
          to="/movies"
        >
          Movie Finder
        </NavLink>

        <ul className="navbar-nav">
          {displayLogout &&
          localStorage.getItem("email") &&
          localStorage.getItem("password") ? (
            <>
              <NavLink
                to="/login"
                className="mx-2"
              >
                <button
                  onClick={handleLogout}
                  className="btn btn-primary btn-outline-light mx-1"
                >
                  Logout
                </button>
              </NavLink>
            </>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
