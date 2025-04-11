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

const ratingOptions = [
  "G",
  "PG",
  "PG-13",
  "R",
  "NC-17",
  "TV-Y",
  "TV-Y7",
  "TV-G",
  "TV-PG",
  "TV-14",
  "TV-MA",
];

const formatGenreLabel = (key: string) =>
  key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace("Tv", "TV");

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

    if (name === "release_year" && value.length > 4) return;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
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
      const added = await addMovie(formData);
      onSuccess(added); // This has the real show_id
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded"
      style={{ backgroundColor: "#f2e6ff" }}
    >
      <div className="accordion mb-3" id="newMovieAccordion">
        {/* Show Details */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="newHeadingDetails">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#newCollapseDetails"
              aria-expanded="true"
              aria-controls="newCollapseDetails"
            >
              Show Details
            </button>
          </h2>
          <div
            id="newCollapseDetails"
            className="accordion-collapse collapse show"
            aria-labelledby="newHeadingDetails"
            data-bs-parent="#newMovieAccordion"
          >
            <div className="accordion-body">
              {/* Type + Title */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Type</label>
                  <select
                    name="type"
                    className="form-select"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="Movie">Movie</option>
                    <option value="TV Show">TV Show</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Director + Cast */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Director</label>
                  <input
                    type="text"
                    name="director"
                    className="form-control"
                    value={formData.director}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Cast</label>
                  <input
                    type="text"
                    name="cast"
                    className="form-control"
                    value={formData.cast}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Country + Release Year */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Release Year</label>
                  <input
                    type="number"
                    name="release_year"
                    className="form-control"
                    value={formData.release_year}
                    onChange={handleChange}
                    min={1900}
                    max={2100}
                  />
                </div>
              </div>

              {/* Rating + Duration */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Rating</label>
                  <select
                    name="rating"
                    className="form-select"
                    value={formData.rating}
                    onChange={handleChange}
                  >
                    <option value="">Select Rating</option>
                    {ratingOptions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    className="form-control"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Ratings Avg + Description */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Ratings Avg</label>
                  <input
                    type="number"
                    name="ratings_Avg"
                    step="0.1"
                    className="form-control"
                    value={formData.ratings_Avg}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Genres Accordion */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="newHeadingGenres">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#newCollapseGenres"
              aria-expanded="false"
              aria-controls="newCollapseGenres"
            >
              Select Genres
            </button>
          </h2>
          <div
            id="newCollapseGenres"
            className="accordion-collapse collapse"
            aria-labelledby="newHeadingGenres"
            data-bs-parent="#newMovieAccordion"
          >
            <div className="accordion-body">
              <div className="row">
                {genreFlags.map((flag) => (
                  <div key={flag} className="col-md-6 mb-2">
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
            </div>
          </div>
        </div>
      </div>

      {/* Hidden genre string */}
      <input type="hidden" name="genre" value={formData.genre} />

      {/* Action Buttons */}
      <div className="d-flex justify-content-end mt-3">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: "#6f42c1", color: "white" }}
        >
          Save Movie
        </button>
      </div>
    </form>
  );
};

export default NewMovieForm;
