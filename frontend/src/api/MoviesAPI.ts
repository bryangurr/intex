import { Movie } from "../types/Movie";

// interface FetchMoviesResponse {
//   movies: Movie[];
//   totalNumMovies: number;
// }

const API_URL =
  "https://cineniche-intex-cdadeqcjgwgygpgy.eastus-01.azurewebsites.net/api/Movies";
// "https://localhost:5000/api/Movies"; // Replace with your actual .NET endpoint
export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedGenres: string[]
): Promise<{ movies: Movie[]; totalNumMovies: number }> => {
  try {
    const genreParams = selectedGenres
      .map((g) => `genre=${encodeURIComponent(g)}`)
      .join("&");

    const response = await fetch(
      `${API_URL}/GetAllMovies?pageSize=${pageSize}&pageNum=${pageNum}${
        selectedGenres.length ? `&${genreParams}` : ""
      }`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    // ✅ Double check that it's in expected shape
    if (
      !Array.isArray(data.movies) ||
      typeof data.totalNumMovies !== "number"
    ) {
      throw new Error("Unexpected response format from server");
    }

    return data; // { movies, totalNumMovies }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  try {
    const show_response = await fetch(`${API_URL}/GetLastShowId`);
    if (!show_response.ok) {
      throw new Error("Failed to fetch last show_id");
    }

    const lastShowId = await show_response.json(); // assuming just a number is returned
    if (typeof lastShowId !== "number") {
      throw new Error("Invalid show_id received from server");
    }
    const movieToAdd = { ...newMovie, show_id: lastShowId + 1 };

    const response = await fetch(`${API_URL}/AddMovie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 👈 required for sending auth cookies
      body: JSON.stringify(movieToAdd),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      throw new Error("Failed to add movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

export const updateMovie = async (
  show_id: number,
  updatedMovie: Movie
): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/UpdateMovie/${show_id}`, {
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

export const deleteMovie = async (show_id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${show_id}`, {
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

// export const fetchAndStoreUserInfo = async (email: string) => {
//   try {
//     const response = await fetch(`${API_URL}/byEmail/${email}`);

//     if (!response.ok) {
//       throw new Error("Failed to fetch user info");
//     }

//     const userData = await response.json();

//     localStorage.setItem("userEmail", userData.email);
//     localStorage.setItem("userName", userData.name);
//     localStorage.setItem("userId", userData.id.toString());
//     localStorage.setItem("userRoles", JSON.stringify(userData.roles)); // store roles as JSON string

//     return userData;
//   } catch (error) {
//     console.error("Error fetching user info:", error);
//     throw error;
//   }
// };
