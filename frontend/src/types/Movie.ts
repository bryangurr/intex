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
  genre: string[]; // cleaned up: ["Action", "Drama", "Anime Series"]
  ratings_Avg: number;
}
