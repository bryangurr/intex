// src/components/MovieCarousel.js
import { useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import "./WelcomeBand.css";

const MovieCarousel = ({ id }: { id: string }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(
      "https://cineniche-intex-cdadeqcjgwgygpgy.eastus-01.azurewebsites.net/api/Movies/GetAllMovies"
    )
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Failed to fetch movies:", err));
  }, []);

  const scrollRow = (direction: number) => {
    const container = document.getElementById(id);
    if (!container) return;

    const cardWidth = 230; // Adjust as needed
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
      <h3 className="px-4">Curated for you</h3>

      <button className="scroll-btn left" onClick={() => scrollRow(-1)}>
        ‹
      </button>
      <button className="scroll-btn right" onClick={() => scrollRow(1)}>
        ›
      </button>

      <div id={id} className="movie-scroll-row d-flex overflow-auto px-4">
        {movies.map((movie) => (
          <div key={movie.show_id} className="card movie-card me-3">
            <div
              className="card-body px-3 py-2"
              style={{
                maxWidth: "10ch",
                // Remove these:
                // overflow: "hidden",
                // textOverflow: "ellipsis",
                // whiteSpace: "nowrap",
              }}
            >
              <h6
                className="card-title mb-0"
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  textAlign: "center",
                  fontSize: "0.95rem",
                }}
              >
                {movie.title}
              </h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
