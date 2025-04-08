import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/MoviesAPI";
import { Movie } from "../types/Movie";

function MovieList({ selectedGenres }: { selectedGenres: string[] }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies(selectedGenres);
        setMovies(data.movies);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [selectedGenres]);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <>
      {movies.map((movie) => (
        <div id="movieCard" className="card mb-3" key={movie.id}>
          <div className="d-flex justify-content-end flex-wrap p-2">
            {movie.genres.map((genre) => (
              <span
                key={genre}
                className="badge bg-secondary me-1 mb-1 text-truncate"
              >
                {genre}
              </span>
            ))}
          </div>

          <h3 className="card-body">{movie.title}</h3>

          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Director:</strong> {movie.director}
              </li>
              <li>
                <strong>Release Year:</strong> {movie.release_year}
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
              className="btn btn-primary"
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default MovieList;
