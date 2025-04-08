export interface Movie {
  id: number;
  title: string;
  director: string;
  cast: string;
  country: string;
  release_year: number;
  rating: string;
  duration: string;
  description: string;
  genres: string[]; // cleaned up: ["Action", "Drama", "Anime Series"]
}
