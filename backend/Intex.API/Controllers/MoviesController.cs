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

        public MoviesController(MoviesDbContext temp)
        {
            _moviesContext = temp;
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


        [HttpGet("GetMoviesByGenre")]
        public IActionResult GetMoviesByGenre(string genre)
        {
            try
            {
                IQueryable<movies_titles> query = genre.ToLower() switch
                {
                    "action" => _moviesContext.movies_titles.Where(m => m.Action == 1),
                    "adventure" => _moviesContext.movies_titles.Where(m => m.Adventure == 1),
                    "anime series international tv shows" => _moviesContext.movies_titles.Where(m => m.Anime_Series_International_TV_Shows == 1),
                    "british tv shows docuseries international tv shows" => _moviesContext.movies_titles.Where(m => m.British_TV_Shows_Docuseries_International_TV_Shows == 1),
                    "children" => _moviesContext.movies_titles.Where(m => m.Children == 1),
                    "comedies" => _moviesContext.movies_titles.Where(m => m.Comedies == 1),
                    "comedies dramas international movies" => _moviesContext.movies_titles.Where(m => m.Comedies_Dramas_International_Movies == 1),
                    "comedies international movies" => _moviesContext.movies_titles.Where(m => m.Comedies_International_Movies == 1),
                    "comedies romantic movies" => _moviesContext.movies_titles.Where(m => m.Comedies_Romantic_Movies == 1),
                    "crime tv shows docuseries" => _moviesContext.movies_titles.Where(m => m.Crime_TV_Shows_Docuseries == 1),
                    "documentaries" => _moviesContext.movies_titles.Where(m => m.Documentaries == 1),
                    "documentaries international movies" => _moviesContext.movies_titles.Where(m => m.Documentaries_International_Movies == 1),
                    "docuseries" => _moviesContext.movies_titles.Where(m => m.Docuseries == 1),
                    "dramas" => _moviesContext.movies_titles.Where(m => m.Dramas == 1),
                    "dramas international movies" => _moviesContext.movies_titles.Where(m => m.Dramas_International_Movies == 1),
                    "dramas romantic movies" => _moviesContext.movies_titles.Where(m => m.Dramas_Romantic_Movies == 1),
                    "family movies" => _moviesContext.movies_titles.Where(m => m.Family_Movies == 1),
                    "fantasy" => _moviesContext.movies_titles.Where(m => m.Fantasy == 1),
                    "horror movies" => _moviesContext.movies_titles.Where(m => m.Horror_Movies == 1),
                    "international movies thrillers" => _moviesContext.movies_titles.Where(m => m.International_Movies_Thrillers == 1),
                    "international tv shows romantic tv shows tv dramas" => _moviesContext.movies_titles.Where(m => m.International_TV_Shows_Romantic_TV_Shows_TV_Dramas == 1),
                    "kids tv" => _moviesContext.movies_titles.Where(m => m.Kids_TV == 1),
                    "language tv shows" => _moviesContext.movies_titles.Where(m => m.Language_TV_Shows == 1),
                    "musicals" => _moviesContext.movies_titles.Where(m => m.Musicals == 1),
                    "nature tv" => _moviesContext.movies_titles.Where(m => m.Nature_TV == 1),
                    "reality tv" => _moviesContext.movies_titles.Where(m => m.Reality_TV == 1),
                    "spirituality" => _moviesContext.movies_titles.Where(m => m.Spirituality == 1),
                    "tv action" => _moviesContext.movies_titles.Where(m => m.TV_Action == 1),
                    "tv comedies" => _moviesContext.movies_titles.Where(m => m.TV_Comedies == 1),
                    "tv dramas" => _moviesContext.movies_titles.Where(m => m.TV_Dramas == 1),
                    "talk shows tv comedies" => _moviesContext.movies_titles.Where(m => m.Talk_Shows_TV_Comedies == 1),
                    "thrillers" => _moviesContext.movies_titles.Where(m => m.Thrillers == 1),
                    _ => null
                };

                if (query == null)
                {
                    return BadRequest("Invalid genre specified.");
                }

                var movies = query.ToList();
                return Ok(movies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error: " + ex.Message);
            }
        }
    }

}
