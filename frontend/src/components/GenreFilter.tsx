import { useEffect, useState } from "react";
import "./GenreFilter.css";

interface GenreFilterProps {
  selectedGenres: string[];
  onChange: (genres: string[]) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  selectedGenres,
  onChange,
}) => {
  const [allGenres, setAllGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch("https://your-backend-url/api/movies/genres");
        const data = await res.json();
        setAllGenres(data);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };

    fetchGenres();
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected && !selectedGenres.includes(selected)) {
      onChange([...selectedGenres, selected]);
    }
  };

  const handleRemove = (genre: string) => {
    onChange(selectedGenres.filter((g) => g !== genre));
  };

  return (
    <div className="genre-filter">
      <select
        id="genre-select"
        className="form-select"
        onChange={handleSelect}
        value=""
      >
        <option value="" disabled>
          Genre ↓
        </option>
        {allGenres.map((genre) => (
          <option
            key={genre}
            value={genre}
            disabled={selectedGenres.includes(genre)}
          >
            {genre}
          </option>
        ))}
      </select>

      {selectedGenres.length > 0 && (
        <div className="chip-container mt-3">
          {selectedGenres.map((genre) => (
            <span key={genre} className="chip">
              {genre}
              <button
                type="button"
                className="btn-close btn-close-white btn-sm ms-2"
                onClick={() => handleRemove(genre)}
                aria-label={`Remove ${genre}`}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreFilter;
