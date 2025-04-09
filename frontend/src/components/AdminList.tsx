import { useEffect, useState, useCallback } from "react";
import { fetchMovies } from "../api/MoviesAPI";
import { Movie } from "../types/Movie";
import "./MovieList.css";
import NewMovieForm from "./NewMovieForm";
import EditMovieForm from "./EditMovieForm";
function AdminList({ selectedGenres }: { selectedGenres: string[] }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageSize] = useState<number>(23);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalMovies, setTotalMovies] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMovies(pageSize, pageNum, selectedGenres);
      if (!Array.isArray(data.movies)) throw new Error("Invalid API format");
      setMovies(data.movies);
      setTotalMovies(data.totalNumMovies);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [pageSize, pageNum, selectedGenres]);
  useEffect(() => {
    loadMovies();
  }, [loadMovies]);
  useEffect(() => {
    setPageNum(1);
  }, [selectedGenres]);
  const totalPages = Math.ceil(totalMovies / pageSize);
  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Admin Movie List</h3>
      <div className="movie-grid-row">
        <div className="col">
          <div
            className="movie-grid-card d-flex justify-content-center align-items-center"
            style={{
              border: "2px dashed #FFFFFF",
              cursor: "pointer",
              backgroundColor: "transparent",
              height: "100%",
              minHeight: "250px",
            }}
            onClick={() => setShowAddModal(true)}
          >
            <span style={{ fontSize: "3rem", color: "#FFFFFF" }}>+</span>
          </div>
        </div>
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
                </ul>
                {selectedCardId === movie.show_id && (
                  <div className="mt-3 d-flex w-100">
                    <button
                      className="btn btn-success btn-chip flex-fill me-1"
                      onClick={() => setEditingMovie(movie)}
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
      </div>
      {/* Add Modal */}
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
                <NewMovieForm
                  onSuccess={() => {
                    setShowAddModal(false);
                    loadMovies();
                  }}
                  onCancel={() => setShowAddModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingMovie && (
        <div
          className="modal d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Movie</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingMovie(null)}
                ></button>
              </div>
              <div className="modal-body">
                <EditMovieForm
                  movie={editingMovie}
                  onSuccess={() => {
                    setEditingMovie(null);
                    fetchMovies(pageSize, pageNum, []).then((data) =>
                      setMovies(data.movies)
                    );
                  }}
                  onCancel={() => setEditingMovie(null)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

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
