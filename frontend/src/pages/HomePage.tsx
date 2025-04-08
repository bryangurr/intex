import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import WelcomeBand from "../components/WelcomeBand";
import "../components/GenreCards.css";

const mockMovies = [
  { id: 1, title: "Skyfall", genre: "Action" },
  { id: 2, title: "The Notebook", genre: "Romance" },
  { id: 3, title: "Interstellar", genre: "Sci-Fi" },
  { id: 4, title: "Inception", genre: "Thriller" },
];

function HomePage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleMovieClick = () => {
    navigate("/login");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <WelcomeBand />
      <br/><br/><br/>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-800 to-blue-800 text-white text-center py-20 px-4">
        <h2 className="text-4xl font-bold mb-4">Discover Your Next Favorite Film</h2>
        <p className="text-lg mb-6">Sign in to get personalized movie recommendations.</p>
        <br/>
        <button
          onClick={handleLoginClick}
          className="bg-white text-blue-800 font-semibold px-6 py-3 rounded shadow hover:bg-gray-200 transition"
        >
          Sign In
        </button>
      </section>
      <br/>
      {/* Movie Carousel */}
      <section className="px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6 text-white">Popular Movies</h3>
        <Slider {...settings}>
          {mockMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={handleMovieClick}
              className="bg-gray-800 rounded p-4 mx-2 cursor-pointer transition transform hover:scale-105 hover:shadow-xl"
            >
              <div className="h-40 bg-gray-700 rounded mb-3 flex items-center justify-center text-gray-300">
                <i className="fas fa-film text-4xl"></i>
              </div>
              <h4 className="font-bold text-white text-center">{movie.title}</h4>
              <p className="text-sm text-gray-400 text-center">{movie.genre}</p>
            </div>
          ))}
        </Slider>
      </section>
      <br></br>

{/* Genre Feature Section */}
<section style={{ padding: '3rem 1.5rem' }}>
  <h3 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginBottom: '1.5rem' }}>
    Browse by Genre
  </h3>
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
  }}>
    {[
      {
        genre: "Superhero",
        tagline: "Heart-Pounding Hits",
        image: "/images/Avengers Infinity War.jpg",
      },
      {
        genre: "Science Fiction",
        tagline: "Exploring the Unknown",
        image: "/images/Star Wars Episode VIII The Last Jedi.jpg",
      },
      {
        genre: "High Fantasy",
        tagline: "Epic Journeys",
        image: "/images/The Lord of the Rings The Return of the King.jpg",
      },
      {
        genre: "Comedy",
        tagline: "Funny Adventures",
        image: "/images/The Other Guys.jpg",
      },
    ].map((genreCard) => (
      <div
        key={genreCard.genre}
        onClick={handleLoginClick}
        className="genre-card"
      >
        <img
          src={genreCard.image}
          alt={genreCard.genre}
        />
        <div className="genre-card-overlay">
          <h4 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{genreCard.genre}</h4>
          <p style={{ fontSize: '0.875rem', margin: 0 }}>{genreCard.tagline}</p>
        </div>
      </div>
    ))}
  </div>
</section>



      <br/><br/>


      {/* Movie Grid */}
      <section className="px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6 text-white">Other movies you might enjoy</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mockMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={handleMovieClick}
              className="bg-gray-800 rounded shadow p-4 cursor-pointer transition transform hover:scale-105 hover:shadow-xl"
            >
              <div className="h-40 bg-gray-700 rounded mb-3 flex items-center justify-center text-gray-300">
                <i className="fas fa-film text-4xl"></i>
              </div>
              <h4 className="font-bold text-white text-center">{movie.title}</h4>
              <p className="text-sm text-gray-400 text-center">{movie.genre}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
