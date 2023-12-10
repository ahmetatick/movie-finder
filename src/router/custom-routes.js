import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login-page";
import ProtectedRoutes from "./protected-routes";
import MoviesPage from "../pages/movies-page";
import NotFoundPage from "../pages/not-found-page";
import MovieDetailsPage from "../pages/movie-details-page";
import HomePage from "../pages/home-page";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={<HomePage />}
          />
          <Route path="/movies">
            <Route
              index
              element={
                <ProtectedRoutes>
                  <MoviesPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoutes>
                  <MovieDetailsPage />
                </ProtectedRoutes>
              }
            />
          </Route>
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
