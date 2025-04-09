import { useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import "./MovieCarousel.css";

interface MovieCarouselProps {
  id: string;
}

const MovieCarousel = ({ id }: MovieCarouselProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("https://localhost:5000/api/Movies/GetAllMovies")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.movies)) {
          setMovies(data.movies);
        } else {
          console.error("Expected data.movies to be an array");
        }
      })
      .catch((err) => console.error("Failed to fetch movies:", err));
  }, []);

  const scrollRow = (direction: number) => {
    const container = document.getElementById(id);
    if (!container) return;

    const cardWidth = 230;
    const scrollByAmount = cardWidth * 5;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (direction > 0) {
      container.scrollLeft >= maxScrollLeft
        ? container.scrollTo({ left: 0, behavior: "smooth" })
        : container.scrollBy({ left: scrollByAmount, behavior: "smooth" });
    } else {
      container.scrollLeft <= 0
        ? container.scrollTo({ left: maxScrollLeft, behavior: "smooth" })
        : container.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="movie-carousel-wrapper bg-none text-white py-4 position-relative">
      <h3 className="carousel-title px-4">Curated for you</h3>

      <button className="scroll-btn left" onClick={() => scrollRow(-1)}>
        ‹
      </button>
      <button className="scroll-btn right" onClick={() => scrollRow(1)}>
        ›
      </button>

      <div id={id} className="movie-scroll-row d-flex overflow-auto px-4">
        {movies.map((movie) => (
          <div key={movie.show_id} className="movie-card me-3">
            <div className="movie-card-body">
              <h6 className="movie-title">{movie.title}</h6>
              <div className="movie-hover-info">More Info</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
