import { Movie } from "../types/Movie";
import "./MovieCarousel.css";

interface MovieCarouselProps {
  movies: Movie[];
  id?: string;
}

const sanitizeTitleForBlob = (title: string) =>
  title
    .replace(/[^a-zA-Z0-9: ]/g, "")
    .replace(/ /g, "%20")
    .replace(/:/g, "%3A");

const fallbackImage =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwcIBwgHBwgHBwcICA4HBwcHBw8IDQcNFhEXFxURGBMZHCggGB4lHhYVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIARMAtwMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAMCBQEH/8QAMhABAAIBAgMFBgUFAQAAAAAAAAECEQMEITOCEhNBUVIUMWFykZIyoaKx4SJjcYHBU//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD8yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUbbRreJvfjGcRGcZTrtnyuqQca+3pFJtSOzNYzMZzmEj0tSJml4jjM1mIj/AEi9n1vR+qAdbbRjUmbW/DHDEcMyp7jR9EfWXO1palbReMTNsxxy2Bn3Gj6I+sncaPoj6y0AZ9xo+iPrJ3Gj6I+stAEW50Y08Wr+GeGJ44lgu3VLXrWKRmYtmeOE3s+t6P1QDbQ29JpFrx2ptGYjOMQ43OhWkRenCM4muc4VacTFKRPCYrETH+me75XVAIQAAAAAAAAAF2z5XVKFds+V1SDYc6kzWlrR74rMwj9q1fOv2guGO21LalbTbGYtiMRhsAAAAAMdzqW06xNcZm2OMZT+1avnX7QXMd5yuqGmnM2pW0++axMs93yp+aAQgAAAAAAAAALtnyuqUK7Z8rqkGmrEzp3iOMzSYiI8eCDutX0X+2XogMNpW1aWi0TWe1njGPBuAAAAAMN3W1qVisTae1nhGfBL3Wr6L/bL0QHOlExp0ieExSImPLgz3nK6obMd3yuqAQgAAAAAAAAALtnyuqUK7Z8rqkGt57NLWj3xWZhJ7Xf00/NVq8u/yT+zzuzb02+gLtvqzqVmZiIxOODVPsomKWzEx/V4/wCFAAAAAMtxqzp1iYiJzOOLD2u/pp+bTeRM0riJn+rw/wAJOzbyt9AelSe1Stp981iWW85XVDTS5dPkj9me85XVAIQAAAAAAAAAF2z5XVKFds+V1SDYfL27NbW9/ZibY803tn9v9f8AAKhnoaveVmez2cTj35aAAAAADPX1e7rE47WZx78MfbP7f6/4BUx3nKn5oa0t2q1t7u1EWx5Mt5yuqAQgAAAAAAAAALtnyuqUK7Z8rqkHety9T5J/Z5z1DEeUfQE+y/Bb5v8AigAAAAAT738Ffm/4jeoYjyj6A40eXp/JH7ON5yp+aGzHecrqgEIAAAAAAAAAC7Z8rqlCs2domk18YnOPgDe09ms2n3ViZYe109N/yabi0V0r58YmsfGXng9HS1Y1ImYiYxOOLtLsrRi1PHPaiPNUAAAADjV1Y04iZiZzOODL2unpv+T5vbRitPHPamPJID06z2qxaPdMRLLecrqh1t7RbSpjwiKz8JZ7y0RSK+MznHwBGAAAAAAAAAARMxOYmYnwmJwAPtrWtxtM2n4zl8ACJxxjh8Ydd7qeu/3y5Add7qeu/wB8ne6nrv8AfLkB13up67/fJ3up/wCl/vlyATOeM8Z8ZkAH2trV41maz5xOHyZmZzMzM+czkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z"; // Update to match your actual fallback path

const MovieCarousel = ({ movies, id = "carousel" }: MovieCarouselProps) => {
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

  if (!Array.isArray(movies) || movies.length === 0) return null;

  return (
    <div className="movie-carousel-wrapper1 bg-none text-white py-4 position-relative">
      <button className="scroll-btn left" onClick={() => scrollRow(-1)}>
        ‹
      </button>
      <button className="scroll-btn right" onClick={() => scrollRow(1)}>
        ›
      </button>

      <div id={id} className="movie-scroll-row d-flex overflow-auto px-4">
        {movies.map((movie) => {
          const imageUrl = `https://inteximages47.blob.core.windows.net/uploads/${sanitizeTitleForBlob(movie.title)}.jpg`;

          return (
            <div key={movie.show_id} className="px-1">
              <a
                href={`/movie/${movie.show_id}`}
                className="carousel-link text-decoration-none"
              >
                <img
                  src={imageUrl}
                  alt={movie.title}
                  className="carousel-img1"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImage;
                  }}
                />
                <p className="carousel-title1 text-white mt-2">{movie.title}</p>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieCarousel;
