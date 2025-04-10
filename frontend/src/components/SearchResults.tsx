import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import "./MovieList.css";
import WelcomeBand from "./WelcomeBand";
import AuthorizeView from "./AuthorizeView";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      fetch(
        `https://cineniche-intex-cdadeqcjgwgygpgy.eastus-01.azurewebsites.net/api/Movies/Search?query=${encodeURIComponent(query)}`
      )
        .then((res) => res.json())
        .then((data) => {
          setResults(data.movies ?? data);
        })
        .catch((err) => console.error("Search failed:", err))
        .finally(() => setLoading(false));
    }
  }, [query]);

  const [imageErrorIds, setImageErrorIds] = useState<Set<number>>(new Set());
  const handleImageError = (showId: number) => {
    setImageErrorIds((prev) => new Set(prev).add(showId));
  };

  const sanitizeTitleForBlob = (title: string) => {
    return title
      .replace(/[^a-zA-Z0-9 ]/g, "") // Remove special characters
      .replace(/ /g, "%20"); // URL encode spaces
  };

  return (
    <>
      <AuthorizeView>
        <WelcomeBand />
      </AuthorizeView>
      <div className="container mt-5 pt-5 text-white">
        <h2 className="text-white mb-4">Search Results for "{query}"</h2>

        {loading ? (
          <p>Loading...</p>
        ) : results.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          <div className="movie-grid-row">
            {results.map((movie) => {
              const isFallback = imageErrorIds.has(movie.show_id);
              const posterSrc = isFallback
                ? "https://inteximages47.blob.core.windows.net/uploads/default-movie.jpg"
                : `https://inteximages47.blob.core.windows.net/uploads/${sanitizeTitleForBlob(movie.title)}.jpg`;

              return (
                <div className="col" key={movie.show_id}>
                  <div
                    className="movie-grid-card position-relative"
                    onClick={() => navigate(`/movie/${movie.show_id}`)}
                    role="button"
                  >
                    <img
                      src={posterSrc}
                      alt={movie.title}
                      className="poster-img1"
                      onError={() => handleImageError(movie.show_id)}
                    />

                    <div className="movie-hover-overlay">
                      <div className="overlay-content">
                        <h5 className="hover-title">{movie.title}</h5>
                        <div className="d-flex flex-wrap justify-content-center mt-2">
                          {movie.genre &&
                            movie.genre.split(",").map((g, i) => (
                              <span
                                key={`${movie.show_id}-genre-${i}`}
                                className="badge bg-secondary me-1 mb-1 badge-truncate"
                                title={g.trim()}
                              >
                                {g.trim()}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchResults;
