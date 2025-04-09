using Intex.API.Data;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Intex.API.Controllers
{
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

        [HttpGet("GetMovie")]
        public IActionResult GetMovie(int show_id)
        {
            var movie = _moviesContext.movies_titles.Where(m => m.show_id == show_id);
            return Ok(movie);

        }
        [HttpGet("GetAllMovies")]
        public IActionResult GetAllMovies()
        {
            var movies = _moviesContext.movies_titles.Take(50).ToList();
            return Ok(movies);
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
