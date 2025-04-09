import React, { useEffect, useState } from "react";
import Select from "react-select";
import "bootstrap-icons/font/bootstrap-icons.css";

interface GenreFilterProps {
  selectedGenres: string[];
  onChange: (genres: string[]) => void;
}

const MOVIE_GENRES = [
  "Action",
  "Adventure",
  "Comedies",
  "Dramas",
  "Fantasy",
  "Horror Movies",
  "Family Movies",
  "Thrillers",
  "Musicals",
  "Romantic Movies",
  "International Movies Thrillers",
];

const TV_GENRES = [
  "TV Action",
  "TV Comedies",
  "TV Dramas",
  "Reality TV",
  "Kids' TV",
  "Language TV Shows",
  "Talk Shows TV Comedies",
  "Anime Series International TV Shows",
  "British TV Shows Docuseries International TV Shows",
  "International TV Shows Romantic TV Shows TV Dramas",
];

const DOCUMENTARY_GENRES = [
  "Documentaries",
  "Docuseries",
  "Crime TV Shows Docuseries",
  "Nature TV",
  "Spirituality",
  "Documentaries International Movies",
];

// Helper to clean label
const formatGenreLabel = (label: string) => label.replace(/_/g, " ");
const createOptions = (genres: string[]) =>
  genres.map((g) => ({ value: g, label: formatGenreLabel(g) }));

const GenreDropdownGroup = ({
  label,
  genres,
  selectedGenres,
  onChange,
}: {
  label: string;
  genres: string[];
  selectedGenres: string[];
  onChange: (newGenres: string[]) => void;
}) => {
  const options = [
    { value: `All_${label}`, label: `All ${label}` },
    ...createOptions(genres),
  ];

  const handleChange = (selectedOptions: any) => {
    const values = selectedOptions.map((opt: any) => opt.value);
    if (values.includes(`All_${label}`)) {
      onChange(genres); // Select all in this group
    } else {
      onChange(values);
    }
  };

  const selected = createOptions(genres).filter((opt) =>
    selectedGenres.includes(opt.value)
  );

  return (
    <div className="mb-3" style={{ minWidth: "250px" }}>
      <label className="form-label fw-bold text-white">{label}</label>
      <Select
        isMulti
        options={options}
        value={selected}
        onChange={handleChange}
        placeholder={`Select ${label} genres...`}
        classNamePrefix="select"
      />
    </div>
  );
};

const GenreFilterDropdown: React.FC<GenreFilterProps> = ({
  selectedGenres,
  onChange,
}) => {
  const [movieGenres, setMovieGenres] = useState<string[]>([]);
  const [tvGenres, setTvGenres] = useState<string[]>([]);
  const [docGenres, setDocGenres] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const clearAllGenres = () => {
    setMovieGenres([]);
    setTvGenres([]);
    setDocGenres([]);
  };

  useEffect(() => {
    const merged = Array.from(
      new Set([...movieGenres, ...tvGenres, ...docGenres])
    );
    onChange(merged);
  }, [movieGenres, tvGenres, docGenres, onChange]);

  return (
    <div className="mb-4">
      <div className="d-flex flex-wrap align-items-start gap-3">
        {/* Toggle Filter Button (left side) */}
        <button
          className="btn btn-outline-light d-flex align-items-center border-radius-5 px-3 py-2"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <span className="me-2">
            {showFilters ? "Close Filters" : "Filters"}
          </span>
          <i className={`bi ${showFilters ? "bi-x-circle" : "bi-funnel"}`}></i>
        </button>

        {(movieGenres.length > 0 ||
          tvGenres.length > 0 ||
          docGenres.length > 0) && (
          <button
            className="btn btn-outline-danger d-flex align-items-center border-radius-5 px-3 py-2"
            onClick={clearAllGenres}
          >
            <span className="me-2">Unselect All</span>
            <i className="bi bi-x-circle"></i>
          </button>
        )}

        {/* Filters appear to the right */}
        {showFilters && (
          <div className="d-flex flex-wrap gap-4 ms-auto">
            <GenreDropdownGroup
              label="Movies"
              genres={MOVIE_GENRES}
              selectedGenres={movieGenres}
              onChange={setMovieGenres}
            />
            <GenreDropdownGroup
              label="TV Shows"
              genres={TV_GENRES}
              selectedGenres={tvGenres}
              onChange={setTvGenres}
            />
            <GenreDropdownGroup
              label="Documentaries"
              genres={DOCUMENTARY_GENRES}
              selectedGenres={docGenres}
              onChange={setDocGenres}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreFilterDropdown;
