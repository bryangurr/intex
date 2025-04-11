import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import WelcomeBand from "../components/WelcomeBand";
import "../components/GenreCards.css";
// import AuthorizeView from "../components/AuthorizeView";

const mockMovies = [
  {
    id: 1,
    title: "Personalized Recommendations",
    genre: "More of what you like",
  },
  { id: 2, title: "Unique Movie Selection", genre: "Hard-to-find content" },
  { id: 3, title: "Intuitive Interface", genre: "Easy to use Features" },
  {
    id: 4,
    title: "Affordable Pricing",
    genre: "Your favorite movies and shows for $7.99/month",
  },
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
      {/* <AuthorizeView> */}
      <WelcomeBand />
      {/* </AuthorizeView> */}
      <br />
      <br />
      <br />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-800 to-blue-800 text-white text-center py-20 px-4">
        <h2 className="text-4xl font-bold mb-4">
          Discover Your Next Favorite Film
        </h2>
        <p className="text-lg mb-6">
          Sign in to get personalized movie recommendations.
        </p>
        <br />
        <button
          onClick={handleLoginClick}
          className="btn btn-purple text-uppercase fw-bold"
          style={{
            fontSize: "1rem",
            padding: "1rem 2rem",
            borderRadius: "0.5rem",
          }}
        >
          Sign In
        </button>
      </section>

      {/* Genre Feature Section */}
      <section style={{ padding: "3rem 1.5rem" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#fff",
              marginBottom: "1.5rem",
            }}
          >
            Browse by Genre
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              {
                genre: "Superhero",
                tagline: "Avengers, Assemble for Action!",
                image: "/images/Avengers Infinity War.jpg",
              },
              {
                genre: "Science Fiction",
                tagline: "The Force Awakens Again",
                image: "/images/Star Wars Episode VIII The Last Jedi.jpg",
              },
              {
                genre: "High Fantasy",
                tagline: "One Quest to Rule Them All",
                image:
                  "/images/The Lord of the Rings The Return of the King.jpg",
              },
              {
                genre: "Comedy",
                tagline: "Laughs, Lies, and Law Enforcement",
                image: "/images/The Other Guys.jpg",
              },
              {
                genre: "Action",
                tagline: "With Great Power Comes Epic Battles",
                image: "/images/SpiderMan 3.jpg",
              },
              {
                genre: "Drama",
                tagline: "Hope, Hustle, and the Human Spirit",
                image: "/images/The Pursuit of Happyness.jpg",
              },
              {
                genre: "Musical",
                tagline: "Revolution, Redemption, and Song",
                image: "/images/Les Misérables.jpg",
              },
              {
                genre: "Fantasy",
                tagline: "Magic, Love, and Falling Stars",
                image: "/images/Stardust.jpg",
              },
              {
                genre: "Horror",
                tagline: "A Coraline Nightmare You Won’t Forget",
                image: "/images/Coraline.jpg",
              },
              {
                genre: "Romance",
                tagline: "Love That Defies the Odds",
                image: "/images/A Walk to Remember.jpg",
              },
              {
                genre: "Thriller/Mystery",
                tagline: "Secrets Buried in American History",
                image: "/images/National Treasure.jpg",
              },
              {
                genre: "Animation",
                tagline: "Super Family. Super Problems.",
                image: "/images/The Incredibles 2.jpg",
              },
            ].map((genreCard) => (
              <div
                key={genreCard.genre}
                onClick={handleLoginClick}
                className="genre-card"
              >
                <img src={genreCard.image} alt={genreCard.genre} />
                <div className="genre-card-overlay">
                  <h4
                    style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}
                  >
                    {genreCard.genre}
                  </h4>
                  <p style={{ fontSize: "0.875rem", margin: 0 }}>
                    {genreCard.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section
        style={{
          backgroundColor: "#2d2d2d", // lighter than black
          padding: "4rem 1.5rem",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}
          >
            Unlock Unlimited Movies & Shows
          </h2>
          <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
            Subscribe now for just <strong>$7.99/month</strong> and enjoy a
            world of entertainment tailored just for you.
          </p>
          <button
            onClick={handleLoginClick}
            className="btn btn-purple btn-big text-uppercase fw-bold"
            style={{
              fontSize: "1rem",
              padding: "1rem 2rem",
              borderRadius: "0.5rem",
            }}
          >
            Subscribe
          </button>
        </div>
      </section>

      <br />
      <br />
      {/* Carousel */}
      <section className="px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6 text-white">
          What CineNiche has to offer:{" "}
        </h3>
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
              <h4 className="font-bold text-white text-center">
                {movie.title}
              </h4>
              <p className="text-sm text-gray-400 text-center">{movie.genre}</p>
            </div>
          ))}
        </Slider>
      </section>
      <br />
      <br />
    </div>
  );
}

export default HomePage;
