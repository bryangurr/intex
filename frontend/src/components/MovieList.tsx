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
  const handleImageError = (showId: number) => {
    setImageErrorIds((prev) => new Set(prev).add(showId));
  };

  const sanitizeTitleForBlob = (title: string) => {
    return title
      .replace(/[^a-zA-Z0-9 ]/g, "") // Remove special characters
      .replace(/ /g, "%20"); // URL encode spaces
  };

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


  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-white">Browse Movies</h2>

      <div className="movie-grid-row">
        {movies.map((movie, index) => {
          const isFallback = imageErrorIds.has(movie.show_id);
          const posterSrc = isFallback
            ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwcIBwgHBwgHBwcICA4HBwcHBw8IDQcNFhEXFxURGBMZHCggGB4lHhYVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIARMAtwMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAMCBQEH/8QAMhABAAIBAgMFBgUFAQAAAAAAAAECEQMEITOCEhNBUVIUMWFykZIyoaKx4SJjcYHBU//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD8yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUbbRreJvfjGcRGcZTrtnyuqQca+3pFJtSOzNYzMZzmEj0tSJml4jjM1mIj/AEi9n1vR+qAdbbRjUmbW/DHDEcMyp7jR9EfWXO1palbReMTNsxxy2Bn3Gj6I+sncaPoj6y0AZ9xo+iPrJ3Gj6I+stAEW50Y08Wr+GeGJ44lgu3VLXrWKRmYtmeOE3s+t6P1QDbQ29JpFrx2ptGYjOMQ43OhWkRenCM4muc4VacTFKRPCYrETH+me75XVAIQAAAAAAAAAF2z5XVKFds+V1SDYc6kzWlrR74rMwj9q1fOv2guGO21LalbTbGYtiMRhsAAAAAMdzqW06xNcZm2OMZT+1avnX7QXMd5yuqGmnM2pW0++axMs93yp+aAQgAAAAAAAAALtnyuqUK7Z8rqkGmrEzp3iOMzSYiI8eCDutX0X+2XogMNpW1aWi0TWe1njGPBuAAAAAMN3W1qVisTae1nhGfBL3Wr6L/bL0QHOlExp0ieExSImPLgz3nK6obMd3yuqAQgAAAAAAAAALtnyuqUK7Z8rqkGt57NLWj3xWZhJ7Xf00/NVq8u/yT+zzuzb02+gLtvqzqVmZiIxOODVPsomKWzEx/V4/wCFAAAAAMtxqzp1iYiJzOOLD2u/pp+bTeRM0riJn+rw/wAJOzbyt9AelSe1Stp981iWW85XVDTS5dPkj9me85XVAIQAAAAAAAAAF2z5XVKFds+V1SDYfL27NbW9/ZibY803tn9v9f8AAKhnoaveVmez2cTj35aAAAAADPX1e7rE47WZx78MfbP7f6/4BUx3nKn5oa0t2q1t7u1EWx5Mt5yuqAQgAAAAAAAAALtnyuqUK7Z8rqkHety9T5J/Z5z1DEeUfQE+y/Bb5v8AigAAAAAT738Ffm/4jeoYjyj6A40eXp/JH7ON5yp+aGzHecrqgEIAAAAAAAAAC7Z8rqlCs2domk18YnOPgDe09ms2n3ViZYe109N/yabi0V0r58YmsfGXng9HS1Y1ImYiYxOOLtLsrRi1PHPaiPNUAAAADjV1Y04iZiZzOODL2unpv+T5vbRitPHPamPJID06z2qxaPdMRLLecrqh1t7RbSpjwiKz8JZ7y0RSK+MznHwBGAAAAAAAAAARMxOYmYnwmJwAPtrWtxtM2n4zl8ACJxxjh8Ydd7qeu/3y5Add7qeu/wB8ne6nrv8AfLkB13up67/fJ3up/wCl/vlyATOeM8Z8ZkAH2trV41maz5xOHyZmZzMzM+czkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z"
            : `https://inteximages47.blob.core.windows.net/uploads/${sanitizeTitleForBlob(
                movie.title
              )}.jpg`;

          return (
            <div
              className="col"
              key={movie.show_id}
              ref={index === movies.length - 1 ? observerRef : null}
            >
              <div
                className="movie-grid-card"
                onClick={() => navigate(`/movie/${movie.show_id}`)}
                role="button"
                style={{ cursor: "pointer", position: "relative" }}
              >
                <img
                  src={posterSrc}
                  alt={movie.title}
                  className="poster-img1"
                  onError={() => handleImageError(movie.show_id)}
                />

                {/* Only show title if fallback image is active */}
                {isFallback && (
                  <div className="movie-title-overlay">
                    <h5 className="text-white text-center px-2 m-0">
                      {movie.title}
                    </h5>
                  </div>
                )}

                {/* Genre badges */}
                <div className="d-flex justify-content-end flex-wrap p-2 position-absolute top-0 end-0 z-1 genre-badges">
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
