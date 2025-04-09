import { useState, useEffect } from "react";
import WelcomeBand from "../components/WelcomeBand";
import MovieList from "../components/MovieList";
import "./MoviePage.css";
import MovieCarousel from "../components/MovieCarousel";
import GenreFilterDropdown from "../components/GenreFilter";

const MoviePage = () => {
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
        <div>
          <MovieCarousel id="caoursel-1" />
        </div>
        <div>
          <MovieCarousel id="caoursel-2" />
        </div>
        <br />
        <div className="genre-filter-wrapper">
          <GenreFilterDropdown
            selectedGenres={selectedGenres}
            onChange={setSelectedGenres}
          />
        </div>
        <div className="row mt-4">
          <div className="col-12 d-flex justify-content-center">
            <MovieList selectedGenres={selectedGenres} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviePage;
