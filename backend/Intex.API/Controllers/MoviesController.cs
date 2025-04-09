using Intex.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Intex.API.Controllers
{
    public static class PredicateBuilder
    {
        public static Expression<Func<T, bool>> True<T>() => f => true;
        public static Expression<Func<T, bool>> False<T>() => f => false;

        public static Expression<Func<T, bool>> Or<T>(
            this Expression<Func<T, bool>> expr1,
            Expression<Func<T, bool>> expr2)
        {
            var invokedExpr = Expression.Invoke(expr2, expr1.Parameters);
            return Expression.Lambda<Func<T, bool>>(
                Expression.OrElse(expr1.Body, invokedExpr), expr1.Parameters);
        }
    }


    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MoviesDbContext _moviesContext;
        private readonly RecommendationsDbContext _recommendContext;
        private readonly UserRecommendationsDbContext _userRecommendationsContext;

        public MoviesController(MoviesDbContext moviesContext, RecommendationsDbContext recommendationContext, UserRecommendationsDbContext userRecommendationsContext)
        {
            _moviesContext = moviesContext;
            _recommendContext = recommendationContext;
            _userRecommendationsContext = userRecommendationsContext;
            Console.WriteLine("[DEBUG] MoviesController Initialized");
        }


        [HttpGet("GetFirst")]
        public IActionResult Get()
        {
            try {
                var result = _moviesContext.movies_titles.FirstOrDefault();
                return Ok(result);
            } catch (Exception err) {
                return StatusCode(500, "Oops! Internal Server Error: " + err.Message);
            }

        }

        // [HttpGet("GetMovie")]
        // public IActionResult GetMovie(int show_id)
        // {
        //     var movie = _moviesContext.movies_titles.Where(m => m.show_id == show_id);
        //     return Ok(movie);

        // }

        [HttpGet("GetMovie/{show_id}")]
        public IActionResult GetMovie(int show_id) {
            try {
            var movie = _moviesContext.movies_titles.Where(m => m.show_id == show_id).FirstOrDefault();
            if (movie == null) {
                return NotFound();
            }
            
            return Ok(movie);
            } catch (Exception err) {
                Console.WriteLine("Whoops! There was an error: " + err);
                return StatusCode(500, "Whoops! There was an error: " + err.Message);
            }
        }

        //[HttpGet("GetAllMovies")]
        //public IActionResult GetAllMovies()
        //{
        //    var movies = _moviesContext.movies_titles.Take(20).ToList();
        //    return Ok(movies);
        //}

        [HttpGet("GetAllMovies")]
        public IActionResult GetAllMovies(
    [FromQuery] int pageSize = 10,
    [FromQuery] int pageNum = 1,
    [FromQuery] List<string>? genre = null)
        {


            if (pageSize <= 0 || pageNum <= 0)
            {
                return BadRequest("pageSize and pageNum must be greater than zero.");
            }

            var moviesQuery = _moviesContext.movies_titles.AsQueryable();

            // Optional genre filter
            if (genre != null && genre.Any())
            {
                var genreColumns = genre.Select(g => g.Replace(" ", "_")).ToList();

                // Start with false (i.e., no filter)
                var predicate = PredicateBuilder.False<movies_titles>();

                foreach (var column in genreColumns)
                {
                    var col = column; // Prevent closure issue
                    predicate = predicate.Or(m => EF.Property<int>(m, col) == 1);
                }

                moviesQuery = moviesQuery.Where(predicate);
            }

            // Total count BEFORE pagination
            var totalNumMovies = moviesQuery.Count();

            // Apply pagination
            var pagedMovies = moviesQuery
                .GroupBy(m => m.show_id)
                .Select(g => g.First()) // keep the first movie in each group
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                movies = pagedMovies,
                totalNumMovies = totalNumMovies
            });
        }

        [HttpGet("Search")]
        public async Task<IActionResult> SearchMovies(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("Query cannot be empty.");

            // Flexible case-insensitive partial match
            var matchedMovies = await _moviesContext.movies_titles
                .Where(m =>
                    EF.Functions.Like(m.title, $"%{query}%") ||
                    EF.Functions.Like(m.description, $"%{query}%"))
                .ToListAsync();

            return Ok(new
            {
                movies = matchedMovies,
                total = matchedMovies.Count
            });
        }

        // [HttpGet("RelatedCarousel/{showId}")]
        // public async Task<IActionResult> GetRelatedShows(int showId)
        // {
        //     // This DbContext should be tied to your OTHER database
        //     var show = await _recommendContext.recommendations
        //         .FirstOrDefaultAsync(r => r.show_id == showId);

        //     if (show == null || string.IsNullOrEmpty(show.recommended_show_ids))
        //         return NotFound("No related shows found.");

        //     // Split CSV string into int list
        //     var ids = show.recommended_show_ids
        //         .Split(',', StringSplitOptions.RemoveEmptyEntries)
        //         .Select(id => int.TryParse(id, out var num) ? num : (int?)null)
        //         .Where(id => id.HasValue)
        //         .Select(id => id.Value)
        //         .ToList();

        //     // Use your main Movies DB context to fetch the actual show data
        //     var relatedMovies = await _moviesContext.movies_titles
        //         .Where(m => ids.Contains(m.show_id))
        //         .ToListAsync();

        //     return Ok(relatedMovies);
        // }
        
        [HttpGet("RelatedCarousel/{showId}")]
        public async Task<IActionResult> GetRelatedShows(int showId)
        {
            try
            {
                Console.WriteLine($"[DEBUG] Looking up recommendations for show ID: {showId}");

                // Check recommendations DB
                var show = await _recommendContext.recommendations
                    .FirstOrDefaultAsync(r => r.show_id == showId);

                if (show == null)
                {
                    Console.WriteLine($"[WARN] No recommendation entry found for show ID: {showId}");
                    return NotFound("No related shows found.");
                }

                if (string.IsNullOrEmpty(show.recommended_show_ids))
                {
                    Console.WriteLine($"[WARN] Recommendation entry found but no IDs for show ID: {showId}");
                    return NotFound("No related shows found.");
                }

                Console.WriteLine($"[DEBUG] Raw recommended_show_ids: {show.recommended_show_ids}");

                // Split CSV string into int list
                var ids = show.recommended_show_ids
                    .Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(id => int.TryParse(id, out var num) ? num : (int?)null)
                    .Where(id => id.HasValue)
                    .Select(id => id.Value)
                    .ToList();

                Console.WriteLine($"[DEBUG] Parsed {ids.Count} related show IDs.");

                // Now query the main movies DB
                var relatedMovies = await _moviesContext.movies_titles
                    .Where(m => ids.Contains(m.show_id))
                    .ToListAsync();

                Console.WriteLine($"[DEBUG] Found {relatedMovies.Count} matching related movies.");

                return Ok(relatedMovies);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Exception in GetRelatedShows({showId}): {ex.Message}");
                Console.WriteLine(ex.StackTrace);
                return StatusCode(500, "An error occurred while processing your request: " + ex.Message + " ------ " + ex.StackTrace);
            }
        }


        [HttpGet("UserRecommendations/{userId}")]
        public async Task<IActionResult> GetUserRecommendations(int userId)
        {
            var userRecs = await _userRecommendationsContext.user_recommendations
                .Where(r => r.user_id == userId)
                .ToListAsync();

            var result = new List<object>();

            foreach (var rec in userRecs)
            {
                var ids = rec.recommended_show_ids
                    .Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(id => int.TryParse(id, out var num) ? num : (int?)null)
                    .Where(id => id.HasValue)
                    .Select(id => id.Value)
                    .ToList();

                var movies = await _moviesContext.movies_titles
                    .Where(m => ids.Contains(m.show_id))
                    .ToListAsync();

                result.Add(new
                {
                    type = rec.list_type,
                    movies = movies
                });
            }

            return Ok(result);
        }


        [HttpPut("UpdateMovie/{show_id}")]
        public IActionResult UpdateMovie(int show_id, [FromBody] movies_titles updatedMovie)
        {
            var existingMovie = _moviesContext.movies_titles.Find(show_id);

            //if (existingMovie == null)
            //{
            //    return NotFound();
            //}
            existingMovie.type = updatedMovie.type;
            existingMovie.title = updatedMovie.title;
            existingMovie.director = updatedMovie.director;
            existingMovie.cast = updatedMovie.cast;
            existingMovie.country = updatedMovie.country;
            existingMovie.release_year = updatedMovie.release_year;
            existingMovie.rating = updatedMovie.rating;
            existingMovie.duration = updatedMovie.duration;
            existingMovie.description = updatedMovie.description;
            existingMovie.Action = updatedMovie.Action;
            existingMovie.Adventure = updatedMovie.Adventure;
            existingMovie.Anime_Series_International_TV_Shows = updatedMovie.Anime_Series_International_TV_Shows;
            existingMovie.British_TV_Shows_Docuseries_International_TV_Shows = updatedMovie.British_TV_Shows_Docuseries_International_TV_Shows;
            existingMovie.Children = updatedMovie.Children;
            existingMovie.Comedies = updatedMovie.Comedies;
            existingMovie.Comedies_Dramas_International_Movies = updatedMovie.Comedies_Dramas_International_Movies;
            existingMovie.Comedies_International_Movies = updatedMovie.Comedies_International_Movies;
            existingMovie.Comedies_Romantic_Movies = updatedMovie.Comedies_Romantic_Movies;
            existingMovie.Crime_TV_Shows_Docuseries = updatedMovie.Crime_TV_Shows_Docuseries;
            existingMovie.Documentaries = updatedMovie.Documentaries;
            existingMovie.Documentaries_International_Movies = updatedMovie.Documentaries_International_Movies;
            existingMovie.Docuseries = updatedMovie.Docuseries;
            existingMovie.Dramas = updatedMovie.Dramas;
            existingMovie.Dramas_International_Movies = updatedMovie.Dramas_International_Movies;
            existingMovie.Dramas_Romantic_Movies = updatedMovie.Dramas_Romantic_Movies;
            existingMovie.Family_Movies = updatedMovie.Family_Movies;
            existingMovie.Fantasy = updatedMovie.Fantasy;
            existingMovie.Horror_Movies = updatedMovie.Horror_Movies;
            existingMovie.International_Movies_Thrillers = updatedMovie.International_Movies_Thrillers;
            existingMovie.International_TV_Shows_Romantic_TV_Shows_TV_Dramas = updatedMovie.International_TV_Shows_Romantic_TV_Shows_TV_Dramas;
            existingMovie.Kids_TV = updatedMovie.Kids_TV;
            existingMovie.Language_TV_Shows = updatedMovie.Language_TV_Shows;
            existingMovie.Musicals = updatedMovie.Musicals;
            existingMovie.Nature_TV = updatedMovie.Nature_TV;
            existingMovie.Reality_TV = updatedMovie.Reality_TV;
            existingMovie.Spirituality = updatedMovie.Spirituality;
            existingMovie.TV_Action = updatedMovie.TV_Action;
            existingMovie.TV_Comedies = updatedMovie.TV_Comedies;
            existingMovie.TV_Dramas = updatedMovie.TV_Dramas;
            existingMovie.Talk_Shows_TV_Comedies = updatedMovie.Talk_Shows_TV_Comedies;
            existingMovie.Thrillers = updatedMovie.Thrillers;
            existingMovie.Genre = updatedMovie.Genre;
            existingMovie.Ratings_Avg = updatedMovie.Ratings_Avg;

            _moviesContext.movies_titles.Update(existingMovie);
            _moviesContext.SaveChanges();

            return Ok(existingMovie);
        }
        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] movies_titles newMovie)
        {
            _moviesContext.movies_titles.Add(newMovie);
            _moviesContext.SaveChanges();
            return Ok(newMovie);
        }
        [HttpDelete("DeleteMovie/{show_id}")]
        public IActionResult DeleteMovie(int show_id)
        {
            var movie = _moviesContext.movies_titles.Find(show_id);
            if (movie == null)
            {
                return NotFound
                (new { message = "Movie not found" });
            }
            _moviesContext.movies_titles.Remove(movie);
            _moviesContext.SaveChanges();
            return NoContent();
        }

    }

}
