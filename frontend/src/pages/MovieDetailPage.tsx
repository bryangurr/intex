import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../types/Movie"; // adjust path if needed
import "../components/MovieDetailPage.css"; 
import WelcomeBand from "../components/WelcomeBand";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const MovieDetailPage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<number[]>([]);

  useEffect(() => {
    if (!id) return;
    // fetch(`https://cineniche-intex-cdadeqcjgwgygpgy.eastus-01.azurewebsites.net/api/Movies/RelatedCarousel/${id}`)
    fetch(`https://localhost:5000/api/Movies/RelatedCarousel/${id}`)
      .then(res => res.json())
      .then(data => setRecommendations(data))
      .catch(err => console.error("Failed to load recommendations", err));
}, [id]);



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
  
  const sanitizeTitleForBlob = (title: string) => {
    return title
      .replace(/[^a-zA-Z0-9 ]/g, "")  // Remove special characters except space
      .replace(/ /g, "%20");          // Replace each space (including doubles) with %20
  };
  
  
  const posterSrc = `https://inteximages47.blob.core.windows.net/uploads/${sanitizeTitleForBlob(movie.title)}.jpg`;

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
  
  <img
  src={posterSrc}
  alt={movie.title}
  className="poster-img"
  onError={(e) => {
    e.currentTarget.onerror = null; // prevent infinite loop
    e.currentTarget.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwcIBwgHBwgHBwcICA4HBwcHBw8IDQcNFhEXFxURGBMZHCggGB4lHhYVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIARMAtwMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAMCBQEH/8QAMhABAAIBAgMFBgUFAQAAAAAAAAECEQMEITOCEhNBUVIUMWFykZIyoaKx4SJjcYHBU//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD8yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUbbRreJvfjGcRGcZTrtnyuqQca+3pFJtSOzNYzMZzmEj0tSJml4jjM1mIj/AEi9n1vR+qAdbbRjUmbW/DHDEcMyp7jR9EfWXO1palbReMTNsxxy2Bn3Gj6I+sncaPoj6y0AZ9xo+iPrJ3Gj6I+stAEW50Y08Wr+GeGJ44lgu3VLXrWKRmYtmeOE3s+t6P1QDbQ29JpFrx2ptGYjOMQ43OhWkRenCM4muc4VacTFKRPCYrETH+me75XVAIQAAAAAAAAAF2z5XVKFds+V1SDYc6kzWlrR74rMwj9q1fOv2guGO21LalbTbGYtiMRhsAAAAAMdzqW06xNcZm2OMZT+1avnX7QXMd5yuqGmnM2pW0++axMs93yp+aAQgAAAAAAAAALtnyuqUK7Z8rqkGmrEzp3iOMzSYiI8eCDutX0X+2XogMNpW1aWi0TWe1njGPBuAAAAAMN3W1qVisTae1nhGfBL3Wr6L/bL0QHOlExp0ieExSImPLgz3nK6obMd3yuqAQgAAAAAAAAALtnyuqUK7Z8rqkGt57NLWj3xWZhJ7Xf00/NVq8u/yT+zzuzb02+gLtvqzqVmZiIxOODVPsomKWzEx/V4/wCFAAAAAMtxqzp1iYiJzOOLD2u/pp+bTeRM0riJn+rw/wAJOzbyt9AelSe1Stp981iWW85XVDTS5dPkj9me85XVAIQAAAAAAAAAF2z5XVKFds+V1SDYfL27NbW9/ZibY803tn9v9f8AAKhnoaveVmez2cTj35aAAAAADPX1e7rE47WZx78MfbP7f6/4BUx3nKn5oa0t2q1t7u1EWx5Mt5yuqAQgAAAAAAAAALtnyuqUK7Z8rqkHety9T5J/Z5z1DEeUfQE+y/Bb5v8AigAAAAAT738Ffm/4jeoYjyj6A40eXp/JH7ON5yp+aGzHecrqgEIAAAAAAAAAC7Z8rqlCs2domk18YnOPgDe09ms2n3ViZYe109N/yabi0V0r58YmsfGXng9HS1Y1ImYiYxOOLtLsrRi1PHPaiPNUAAAADjV1Y04iZiZzOODL2unpv+T5vbRitPHPamPJID06z2qxaPdMRLLecrqh1t7RbSpjwiKz8JZ7y0RSK+MznHwBGAAAAAAAAAARMxOYmYnwmJwAPtrWtxtM2n4zl8ACJxxjh8Ydd7qeu/3y5Add7qeu/wB8ne6nrv8AfLkB13up67/fJ3up/wCl/vlyATOeM8Z8ZkAH2trV41maz5xOHyZmZzMzM+czkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z";
  }}
/>
</div>
</div>

        </div>
<br/><br/><br/>
        {/* 🔜 Carousel Placeholder */}
        <div className="mt-12">
  <h2 className="text-2xl font-bold mb-4">
    If you liked <span className="text-indigo-400">{movie.title}</span>, you'll also like...
  </h2>

  <Slider
    dots={true}
    infinite={false}
    speed={500}
    slidesToShow={4}
    slidesToScroll={1}
  >
    {recommendations.map((recId) => (
      <div key={recId} className="px-2">
        <a href={`/movies/${recId}`} className="block">
          <img
            src={`https://inteximages47.blob.core.windows.net/uploads/${recId}.jpg`}
            alt={`Recommended movie ${recId}`}
            className="rounded-lg w-full h-48 object-cover shadow-lg"
            onError={(e) => {
              e.currentTarget.src = "/default-movie.jpg"; // Optional fallback image
            }}
          />
        </a>
      </div>
    ))}
  </Slider>
</div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
