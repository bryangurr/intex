import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../types/Movie"; // adjust path if needed

const MovieDetailPage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    // fetch(`localhost:5173/api/Movies/GetMovie/${id}`)
    fetch(`https://cineniche-intex-cdadeqcjgwgygpgy.eastus-01.azurewebsites.net/api/Movies/GetMovie/${id}`)
      .then((response) => response.json())
      .then((data: Movie) => setMovie(data))
      .catch((error) => console.error("Error fetching movie:", error));
  }, [id]);

  if (!movie) {
    return <div className="text-center mt-10 text-xl">Loading movie...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
        <p className="text-lg text-gray-300 mb-4">
          {movie.release_year} • {movie.duration} • {movie.rating}
        </p>
  
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p>{movie.description}</p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold">Genre</h3>
            <p>{movie.genre}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Country</h3>
            <p>{movie.country}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Director</h3>
            <p>{movie.director}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Average Rating</h3>
            <p>{movie.ratings_Avg.toFixed(1)} / 5.0</p>
          </div>
        </div>
  
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Cast</h2>
          <p className="text-sm text-gray-300 leading-relaxed">{movie.cast}</p>
        </div>
      </div>
    </div>
  );
  
};

export default MovieDetailPage;

