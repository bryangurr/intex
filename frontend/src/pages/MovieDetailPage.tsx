// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Movie } from "../types/Movie";

const MovieDetailPage = () => {
  //   const { id } = useParams();
  //   const [movie, setMovie] = useState(null);

  //   useEffect(() => {
  //     axios
  //       .get(`https://localhost:5000/api/Movies/GetMovie?show_id=${id}`)
  //       .then((res) => {
  //         setMovie(res.data[0]);
  //       })
  //       .catch((err) => console.error(err));
  //   }, [id]);

  //   if (!movie) {
  //     return <div className="text-center mt-10 text-xl">Loading movie...</div>;
  //   }

  //   return (
  //     <div className="max-w-4xl mx-auto p-6">
  //       <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
  //       <p className="text-lg text-gray-600 mb-4">{movie.release_year} • {movie.type} • {movie.rating}</p>

  //       <div className="bg-gray-100 p-4 rounded-lg mb-6">
  //         <h2 className="text-xl font-semibold mb-2">Description</h2>
  //         <p>{movie.description}</p>
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  //         <div>
  //           <h3 className="text-lg font-semibold">Genre</h3>
  //           <p>{movie.genre}</p>
  //         </div>
  //         <div>
  //           <h3 className="text-lg font-semibold">Country</h3>
  //           <p>{movie.country}</p>
  //         </div>
  //         <div>
  //           <h3 className="text-lg font-semibold">Duration</h3>
  //           <p>{movie.duration}</p>
  //         </div>
  //         <div>
  //           <h3 className="text-lg font-semibold">Average Rating</h3>
  //           <p>{movie.ratings_Avg.toFixed(1)} / 5.0</p>
  //         </div>
  //       </div>

  //       <div className="bg-gray-50 p-4 rounded-lg shadow">
  //         <h2 className="text-xl font-semibold mb-2">Cast</h2>
  //         <p className="text-sm text-gray-700 leading-relaxed">{movie.cast}</p>
  //       </div>
  //     </div>
  //   );

  return <></>; // TODO: When uncommenting the above code, this line must be commented out or deleted.
};

export default MovieDetailPage;
