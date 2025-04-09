import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import "./MovieList.css";
import WelcomeBand from "./WelcomeBand";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      fetch(
        `https://localhost:5000/api/Movies/Search?query=${encodeURIComponent(query)}`
      )
        .then((res) => res.json())
        .then((data) => {
          setResults(data.movies ?? data);
        })
        .catch((err) => console.error("Search failed:", err))
        .finally(() => setLoading(false));
    }
  }, [query]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.round(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="star">
          {i < fullStars ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <WelcomeBand />
      <div className="container mt-5 pt-5 text-white">
        <h2 className="text-white mb-4">Search Results for "{query}"</h2>

        {loading ? (
          <p>Loading...</p>
        ) : results.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          <div className="movie-grid-row">
            {results.map((movie) => (
              <div className="col" key={movie.show_id}>
                <div className="movie-grid-card">
                  <div className="d-flex justify-content-end flex-wrap p-2">
                    {movie.genre &&
                      movie.genre.split(",").map((g, i) => (
                        <span
                          key={`${movie.show_id}-genre-${i}`}
                          className="badge bg-secondary me-1 mb-1 badge-truncate"
                          style={{ opacity: 0.5 }}
                          title={g.trim()}
                        >
                          {g.trim()}
                        </span>
                      ))}
                  </div>

                  <div className="movie-card-body">
                    <h6 className="movie-title">{movie.title}</h6>

                    <ul className="list-unstyled text-start movie-details">
                      <li>
                        <strong>Director:</strong> {movie.director}
                      </li>
                      <li>
                        <strong>Year:</strong> {movie.release_year}
                      </li>
                      <li>
                        <strong>Duration:</strong> {movie.duration}
                      </li>
                      <li>
                        <strong>Rating:</strong>{" "}
                        {movie.ratings_Avg === 0 ? (
                          <span className="text-muted">
                            No ratings to display
                          </span>
                        ) : (
                          <>
                            {movie.ratings_Avg.toFixed(1)}{" "}
                            {renderStars(movie.ratings_Avg)}
                          </>
                        )}
                      </li>
                    </ul>

                    <button
                      className="btn btn-primary btn-sm movie-button"
                      style={{
                        backgroundColor: "#6411ad",
                        borderColor: "#6411ad",
                        opacity: 0.8,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                        e.currentTarget.style.color = "#a500cc";
                        e.currentTarget.style.borderColor = "#a500cc";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#6411ad";
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.borderColor = "#6411ad";
                      }}
                      onClick={() => navigate(`/movie/${movie.show_id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchResults;
