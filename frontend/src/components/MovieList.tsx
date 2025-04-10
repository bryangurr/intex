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
  const [imageErrorIds, setImageErrorIds] = useState<Set<number>>(new Set());

  const navigate = useNavigate();

  const handleImageError = (showId: number) => {
    setImageErrorIds((prev) => new Set(prev).add(showId));
  };

  const sanitizeTitleForBlob = (title: string) => {
    return title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "%20");
  };

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchMovies(pageSize, pageNum, selectedGenres);
      if (!Array.isArray(data.movies))
        throw new Error("API response format is incorrect");

      setMovies((prev) =>
        pageNum === 1 ? data.movies : [...prev, ...data.movies]
      );
      setHasMore(pageNum * pageSize < data.totalNumMovies);
    } catch (err) {
      setError(
        (err as Error).message || "An error occurred while fetching movies."
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

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-white">Browse All Movies</h2>
      <br />
      <div className="movie-grid-row">
        {movies.map((movie, index) => {
          if (!movie || !movie.show_id) return null;

          const isFallback = imageErrorIds.has(movie.show_id);
          const posterSrc = isFallback
            ? "/default-movie.jpg"
            : `https://inteximages47.blob.core.windows.net/uploads/${sanitizeTitleForBlob(movie.title)}.jpg`;

          return (
            <div
              className="col"
              key={movie.show_id}
              ref={index === movies.length - 1 ? observerRef : null}
            >
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
