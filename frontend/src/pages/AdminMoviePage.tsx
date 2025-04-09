import { useState, useEffect } from "react";
import WelcomeBand from "../components/WelcomeBand";
import GenreFilter from "../components/GenreFilter";
import MovieList from "../components/MovieList";
import "./MoviePage.css";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import Logout from "../components/Logout";

const AdminMoviePage = () => {
  useEffect(() => {
    document.body.classList.add("movie-page");

    return () => {
      document.body.classList.remove("movie-page");
    };
  }, []);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  return (
    <>
      <AuthorizeView>
        <WelcomeBand />

        <div className="container" style={{ paddingTop: "100px" }}>
          <div className="row mt-2">
            <div className="col-12 d-flex justify-content-center">
              <div className="genre-filter-wrapper">
                <GenreFilter
                  selectedGenres={selectedGenres}
                  onChange={setSelectedGenres}
                />
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-center">
              <MovieList selectedGenres={selectedGenres} />
            </div>
          </div>
        </div>
      </AuthorizeView>
    </>
  );
};

export default AdminMoviePage;
