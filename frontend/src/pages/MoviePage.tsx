import { useState, useEffect } from "react";
import WelcomeBand from "../components/WelcomeBand";
import MovieList from "../components/MovieList";
import "./MoviePage.css";
import MovieCarousel from "../components/MovieCarousel";
import AuthorizeView from "../components/AuthorizeView";
import GenreFilterDropdown from "../components/GenreFilter";
import { Movie } from "../types/Movie";

interface UserCarouselGroup {
  type: string;
  movies: Movie[];
}

const MoviePage = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [carouselGroups, setCarouselGroups] = useState<UserCarouselGroup[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loggedInUserId = 7; // Replace this with dynamic auth logic
  const fallbackUserId = 1;

  useEffect(() => {
    document.body.classList.add("movie-page");
    return () => document.body.classList.remove("movie-page");
  }, []);

  useEffect(() => {
    const fetchCarousels = async (userIdToTry: number, isFallback = false) => {
      try {
        const res = await fetch(
          `https://cineniche-intex-cdadeqcjgwgygpgy.eastus-01.azurewebsites.net/api/Movies/UserRecommendations/${userIdToTry}`
        );
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setCarouselGroups(data);
        } else if (!isFallback) {
          console.warn("No carousels found for user. Falling back to user 1.");
          await fetchCarousels(fallbackUserId, true);
        } else {
          setError("No recommendations available.");
        }
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
        if (!isFallback) {
          await fetchCarousels(fallbackUserId, true);
        } else {
          setError("An error occurred while loading recommendations.");
        }
      }
    };

    fetchCarousels(loggedInUserId);
  }, []);

  const formatTitle = (text: string) => {
    const lower = text.toLowerCase().trim();

    if (lower === "collaborative") return "Curated For You";
    if (lower === "content_based") return "Your Next Watch";

    return lower
      .replace(/^genre[_ ]?/, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim();
  };

  return (
    <AuthorizeView>
      <WelcomeBand />

      <div className="container" style={{ paddingTop: "100px" }}>
        {error && (
          <div className="alert alert-warning text-center text-dark">
            {error}
          </div>
        )}

        {carouselGroups
          .filter(
            (group) => Array.isArray(group.movies) && group.movies.length > 0
          )
          .map((group, idx, arr) => {
            const carouselId = `carousel-${idx}`;
            const isLast = idx === arr.length - 1;

            return (
              <div key={carouselId}>
                <h3 className="text-white mb-3 ps-3">
                  {formatTitle(group.type)}
                </h3>
                <MovieCarousel id={carouselId} movies={group.movies} />
                {isLast && (
                  <hr
                    style={{
                      borderTop: "1px solid white",
                      opacity: 0.4,
                      width: "70%",
                      margin: "2rem auto",
                    }}
                  />
                )}
              </div>
            );
          })}

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
    </AuthorizeView>
  );
};

export default MoviePage;
