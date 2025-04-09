import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/MoviesAPI";
import { Movie } from "../types/Movie";
import Pagination from "./Pagination";

function MovieList({ selectedGenres }: { selectedGenres: string[] }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch movies from the API
  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await fetchMovies(pageSize, pageNum, selectedGenres);

      // Deduplicate based on show_id
      const uniqueMovies = Array.from(
        new Map(data.movies.map((m) => [m.show_id, m])).values()
      );

      setMovies(uniqueMovies);
      setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Reload movies on page change, size change, or filter change
  useEffect(() => {
    loadMovies();
  }, [pageNum, pageSize, selectedGenres]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPageNum(1);
  }, [selectedGenres]);

  return (
    <div className="container mt-4">
      {/* Movie Grid */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {movies.map((movie, index) => (
          <div className="col" key={`${movie.show_id}-${index}`}>
            <div className="card movie-grid-card h-100">
              <div className="d-flex justify-content-end flex-wrap p-2">
                {movie.genre &&
                  movie.genre.split(",").map((g, i) => (
                    <span
                      key={`${movie.show_id}-genre-${i}`}
                      className="badge bg-secondary me-1 mb-1 text-truncate"
                    >
                      {g.trim()}
                    </span>
                  ))}
              </div>

              <div className="card-body text-center px-3 py-2">
                <h6
                  className="card-title mb-2"
                  style={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    fontSize: "1rem",
                  }}
                >
                  {movie.title}
                </h6>

                <ul className="list-unstyled text-start small mb-3">
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
                    <strong>Rating:</strong> {movie.rating}
                  </li>
                  <li>
                    <strong>Country:</strong> {movie.country}
                  </li>
                </ul>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/movie/${movie.show_id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={(newPage) => setPageNum(newPage)}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1); // Reset to page 1 when page size changes
        }}
      />

      {/* Status Messages */}
      {loading && <p className="text-center mt-3">Loading movies...</p>}
      {error && <p className="text-danger text-center mt-3">Error: {error}</p>}
      {!loading && movies.length === 0 && (
        <p className="text-center mt-3">No movies found.</p>
      )}
    </div>
  );
}

export default MovieList;
