import { Movie } from "../types/Movie";

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const API_URL =
  "https://cineniche-intex-cdadeqcjgwgygpgy.eastus-01.azurewebsites.net/api/Movies/GetAllMovies"; // Replace with your actual .NET endpoint

export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedGenres: string[]
): Promise<FetchMoviesResponse> => {
  try {
    const genreParams = selectedGenres
      .map((g) => `genre=${encodeURIComponent(g)}`)
      .join("&");

    const query = new URLSearchParams({
      pageSize: pageSize.toString(),
      pageNum: pageNum.toString(),
    });

    const url = `${API_URL}?${query.toString()}${genreParams ? `&${genreParams}` : ""}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const json = await response.json();

    // ⚠️ Adapt to raw array
    return {
      movies: Array.isArray(json) ? json : [],
      totalNumMovies: 1000, // <-- arbitrary or approximate since backend isn’t returning it
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });

    if (!response.ok) {
      throw new Error("Failed to add movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

export const updateMovie = async (
  movieID: number,
  updatedMovie: Movie
): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/UpdateMovie/${movieID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    });

    if (!response.ok) {
      throw new Error("Failed to update movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

export const deleteMovie = async (movieID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${movieID}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete movie");
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};
