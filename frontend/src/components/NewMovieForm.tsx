import { useState } from "react";
import { Movie } from "../types/Movie";
import { addMovie } from "../api/MoviesAPI";

const genreFlags = [
  "action",
  "adventure",
  "anime_Series_International_TV_Shows",
  "british_TV_Shows_Docuseries_International_TV_Shows",
  "children",
  "comedies",
  "comedies_Dramas_International_Movies",
  "comedies_International_Movies",
  "comedies_Romantic_Movies",
  "crime_TV_Shows_Docuseries",
  "documentaries",
  "documentaries_International_Movies",
  "docuseries",
  "dramas",
  "dramas_International_Movies",
  "dramas_Romantic_Movies",
  "family_Movies",
  "fantasy",
  "horror_Movies",
  "international_Movies_Thrillers",
  "international_TV_Shows_Romantic_TV_Shows_TV_Dramas",
  "kids_TV",
  "language_TV_Shows",
  "musicals",
  "nature_TV",
  "reality_TV",
  "spirituality",
  "tV_Action",
  "tV_Comedies",
  "tV_Dramas",
  "talk_Shows_TV_Comedies",
  "thrillers",
];

const formatGenreLabel = (key: string) =>
  key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace("Tv", "TV"); // For "TV" capitalization

const NewMovieForm = ({
  onSuccess,
  onCancel,
}: {
  onSuccess: (movie: Movie) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<Movie>(() => {
    const flags = Object.fromEntries(genreFlags.map((flag) => [flag, 0]));
    return {
      show_id: 0,
      type: "Movie",
      title: "",
      director: "",
      cast: "",
      country: "",
      release_year: 0,
      rating: "",
      duration: "",
      description: "",
      genre: "",
      ratings_Avg: 0,
      ...flags,
    };
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" ||
        name === "release_year" ||
        name === "ratings_Avg" ||
        name === "show_id"
          ? Number(value)
          : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: checked ? 1 : 0,
      };

      const selectedGenres = genreFlags
        .filter((flag) => updated[flag as keyof Movie] === 1)
        .map(formatGenreLabel);

      return {
        ...updated,
        genre: selectedGenres.join(", "),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addMovie(formData);
      onSuccess(formData);
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="form-label">Show ID</label>
        <input
          type="number"
          name="show_id"
          className="form-control"
          value={formData.show_id}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Director</label>
        <input
          type="text"
          name="director"
          className="form-control"
          value={formData.director}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Cast</label>
        <input
          type="text"
          name="cast"
          className="form-control"
          value={formData.cast}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Country</label>
        <input
          type="text"
          name="country"
          className="form-control"
          value={formData.country}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Release Year</label>
        <input
          type="number"
          name="release_year"
          className="form-control"
          value={formData.release_year}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Rating Type</label>
        <input
          type="text"
          name="rating"
          className="form-control"
          value={formData.rating}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Duration</label>
        <input
          type="text"
          name="duration"
          className="form-control"
          value={formData.duration}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {/* Hidden genre input */}
      <input type="hidden" name="genre" value={formData.genre} />

      <div className="mb-2">
        <label className="form-label">Ratings Average</label>
        <input
          type="number"
          name="ratings_Avg"
          className="form-control"
          step="0.1"
          value={formData.ratings_Avg}
          onChange={handleChange}
        />
      </div>

      <hr />
      <h5>Genres (Select applicable)</h5>
      <div className="row">
        {genreFlags.map((flag) => (
          <div key={flag} className="col-6 mb-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name={flag}
                id={flag}
                checked={formData[flag as keyof Movie] === 1}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor={flag}>
                {formatGenreLabel(flag)}
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Movie
        </button>
      </div>
    </form>
  );
};

export default NewMovieForm;
