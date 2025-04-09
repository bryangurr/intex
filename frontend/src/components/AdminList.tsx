import { useEffect, useState, useCallback } from "react";
import { fetchMovies } from "../api/MoviesAPI";
import { Movie } from "../types/Movie";
import "./MovieList.css"; // reuse the same styles

function AdminList({ selectedGenres }: { selectedGenres: string[] }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageSize] = useState<number>(23);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalMovies, setTotalMovies] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const [newMovie, setNewMovie] = useState<Movie>({
    show_id: 0,
    title: "",
    director: "",
    cast: "",
    country: "",
    release_year: 0,
    rating: 0,
    duration: "",
    description: "",
    genre: "",
    ratings_Avg: 0,
  });

  const handleAddMovie = async () => {
    try {
      // Send to backend — you'll replace this with your actual API
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) throw new Error("Failed to add movie");

      // Close modal, reset form, reload movies
      setShowAddModal(false);
      setNewMovie({
        show_id: 0,
        title: "",
        director: "",
        cast: "",
        country: "",
        release_year: 0,
        rating: 0,
        duration: "",
        description: "",
        genre: "",
        ratings_Avg: 0,
      });
      loadMovies(); // refresh list
    } catch (err) {
      alert("Error adding movie: " + (err as Error).message);
    }
  };

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchMovies(pageSize, pageNum, selectedGenres);

      if (!Array.isArray(data.movies)) {
        throw new Error("API response format is incorrect");
      }

      setMovies(data.movies);
      setTotalMovies(data.totalNumMovies);
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
    setPageNum(1);
  }, [selectedGenres]);

  const totalPages = Math.ceil(totalMovies / pageSize);

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
      <h3 className="text-center mb-4">Admin Movie List</h3>

      <div className="movie-grid-row">
        {/* Add New Movie Card */}
        <div className="col">
          <div
            className="movie-grid-card d-flex justify-content-center align-items-center"
            style={{
              border: "2px dashed #ffffff",
              cursor: "pointer",
              backgroundColor: "transparent",
              height: "100%",
              minHeight: "250px",
            }}
            onClick={() => setShowAddModal(true)}
          >
            <span style={{ fontSize: "3rem", color: "#ffffff" }}>+</span>
          </div>
        </div>

        {/* Movie Cards */}
        {movies.map((movie) => (
          <div className="col" key={movie.show_id}>
            <div
              className="movie-grid-card"
              onClick={() =>
                setSelectedCardId(
                  selectedCardId === movie.show_id ? null : movie.show_id
                )
              }
            >
              <div className="d-flex justify-content-end flex-wrap p-2">
                {movie.genre &&
                  movie.genre.split(",").map((g, i) => (
                    <span
                      key={`${movie.show_id}-genre-${i}`}
                      className="badge bg-secondary me-1 mb-1 badge-truncate"
                      title={g.trim()}
                      style={{ opacity: 0.5 }}
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
                {selectedCardId === movie.show_id && (
                  <div className="mt-3 d-flex w-100">
                    <button
                      className="btn btn-success btn-chip flex-fill me-1"
                      onClick={() => console.log("Edit", movie.show_id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-chip flex-fill ms-1"
                      onClick={() => console.log("Delete", movie.show_id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {showAddModal && (
          <div
            className="modal d-block"
            tabIndex={-1}
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Movie</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-2">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newMovie.title}
                        onChange={(e) =>
                          setNewMovie({ ...newMovie, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Director</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newMovie.director}
                        onChange={(e) =>
                          setNewMovie({ ...newMovie, director: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Genre</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newMovie.genre}
                        onChange={(e) =>
                          setNewMovie({ ...newMovie, genre: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Year</label>
                      <input
                        type="number"
                        className="form-control"
                        value={newMovie.release_year}
                        onChange={(e) =>
                          setNewMovie({
                            ...newMovie,
                            release_year: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    {/* Add other fields as needed */}
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddMovie}
                  >
                    Save Movie
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4 align-items-center flex-wrap gap-2">
        <button
          className="btn bg-white btn-sm custom-purple-btn"
          onClick={() => setPageNum(1)}
          disabled={pageNum === 1}
        >
          First
        </button>

        <button
          className="btn bg-white btn-sm custom-purple-btn"
          onClick={() => setPageNum((p) => Math.max(1, p - 1))}
          disabled={pageNum === 1}
        >
          Previous
        </button>

        <span className="mx-2 text-white">
          Page {pageNum} of {totalPages}
        </span>

        <button
          className="btn bg-white btn-sm custom-purple-btn"
          onClick={() => setPageNum((p) => Math.min(totalPages, p + 1))}
          disabled={pageNum === totalPages}
        >
          Next
        </button>

        <button
          className="btn bg-white btn-sm custom-purple-btn"
          onClick={() => setPageNum(totalPages)}
          disabled={pageNum === totalPages}
        >
          Last
        </button>
      </div>

      {loading && <p className="text-center mt-3">Loading movies...</p>}
      {error && <p className="text-danger text-center mt-3">Error: {error}</p>}
    </div>
  );
}

export default AdminList;
