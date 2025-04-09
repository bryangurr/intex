import { useState, useEffect } from "react";
import WelcomeBand from "../components/WelcomeBand";
import "./MoviePage.css";
import GenreFilterDropdown from "../components/GenreFilter";
import AdminList from "../components/AdminList";

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
      <WelcomeBand />

      <div className="container" style={{ paddingTop: "100px" }}>
        <div className="row mt-2">
          <div className="col-12 d-flex">
            <div className="genre-filter-wrapper">
              <GenreFilterDropdown
                selectedGenres={selectedGenres}
                onChange={setSelectedGenres}
              />
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 d-flex justify-content-center">
            <AdminList selectedGenres={selectedGenres} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMoviePage;
