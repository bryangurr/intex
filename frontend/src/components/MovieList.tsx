import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/MoviesAPI";
import { Movie } from "../types/Movie";
import useInfiniteScroll from "./useInfiniteScroll";
import "./MovieList.css";

function MovieList({ selectedGenres }: { selectedGenres: string[] }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageSize] = useState<number>(30);
  const [pageNum, setPageNum] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchMovies(pageSize, pageNum, selectedGenres);

      if (!Array.isArray(data.movies)) {
        throw new Error("API response format is incorrect");
      }

      setMovies((prevMovies) =>
        pageNum === 1 ? data.movies : [...prevMovies, ...data.movies]
      );
      setHasMore(pageNum * pageSize < data.totalNumMovies);
    } catch (error) {
      setError(
        (error as Error).message || "An error occurred while fetching movies."
      );
    } finally {
      setLoading(false);
    }
  }, [pageNum, selectedGenres, pageSize]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    setMovies([]);
    setPageNum(1);
    setHasMore(true);
  }, [selectedGenres]);

  const loadMore = () => {
    if (!loading && hasMore) setPageNum((prev) => prev + 1);
  };

  const observerRef = useInfiniteScroll(loadMore, hasMore && !loading);

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
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-white">Browse Movies</h2>

      <div className="movie-grid-row">
        {movies.map((movie, index) => (
          <div
            className="col"
            key={`${movie.show_id}`}
            ref={index === movies.length - 1 ? observerRef : null}
          >
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
                      <span className="text-muted">No ratings to display</span>
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

      {loading && <p className="text-center mt-3">Loading movies...</p>}
      {error && <p className="text-danger text-center mt-3">Error: {error}</p>}
      {!loading && !hasMore && movies.length > 0 && (
        <p className="text-center mt-3">No more movies to load.</p>
      )}
      {!loading && movies.length === 0 && (
        <p className="text-center mt-3">No movies found.</p>
      )}
    </div>
  );
}

export default MovieList;
