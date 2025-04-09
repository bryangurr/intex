import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../types/Movie"; // adjust path if needed
import "../components/MovieDetailPage.css"; 
import WelcomeBand from "../components/WelcomeBand";

const MovieDetailPage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);


  useEffect(() => {
    fetch(`https://cineniche-intex-cdadeqcjgwgygpgy.eastus-01.azurewebsites.net/api/Movies/GetMovie/${id}`)
      .then((response) => response.json())
      .then((data: Movie) => setMovie(data))
      .catch((error) => console.error("Error fetching movie:", error));
  }, [id]);

  if (!movie) {
    return <div className="text-center mt-10 text-xl">Loading movie...</div>;
  }

  const renderStars = (currentRating: number | null, onRate: (rating: number) => void) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${currentRating !== null && i <= currentRating ? "filled" : ""}`}
          onClick={() => onRate(i)}
          style={{ cursor: "pointer", fontSize: "1.5rem", marginRight: "4px" }}
        >
          {i <= (currentRating || 0) ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };
  

  // Image:
  const posterSrc = `https://inteximages47.blob.core.windows.net/uploads/${movie.title}.jpg`;


// TEMPORARY: Static image for testing layout
// const posterSrc = "/images/Avengers Infinity War.jpg";

  return (

    <div className="bg-gray-900 text-white min-h-screen">
      <WelcomeBand />
      <br/><br/><br/>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          
        <div className="movie-container">
  {/* Movie Info */}
  <div className="movie-info-card">
    <h1 className="movie-title">{movie.title}</h1>
    <p className="movie-meta">
      {movie.release_year} • {movie.duration} • {movie.rating}
    </p>
    <hr className="movie-divider" />
    <p className="movie-description">{movie.description}</p>

    <div className="movie-details-grid">
      <div><strong>Genre:</strong> {movie.genre}</div>
      <div><strong>Country:</strong> {movie.country}</div>
      <div><strong>Director:</strong> {movie.director}</div>
      <div>
        <strong>Avg. Rating:</strong>{" "}
        {movie.ratings_Avg != null ? movie.ratings_Avg.toFixed(1) + " / 5.0" : "N/A"}
      </div>
      <div className="user-rating-section mt-4">
      <h3 className="text-lg font-semibold mb-1 text-black">Your Rating:</h3>
      <div>{renderStars(userRating, setUserRating)}</div>
    </div>

    </div>

    <div className="movie-cast-box">
      <h2>Cast</h2>
      <p>{movie.cast}</p>
    </div>
  </div>

  {/* Poster */}
  <div className="movie-poster">
    <img src={posterSrc} alt={movie.title} className="poster-img" />
  </div>
</div>

        </div>
<br/><br/><br/>
        {/* 🔜 Carousel Placeholder */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            If you liked <span className="text-indigo-400">{movie.title}</span>, you'll also like...
          </h2>
          <div className="h-40 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 italic">
            (Recommendation carousel coming soon)
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
