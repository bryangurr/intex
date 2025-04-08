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

        [HttpGet("GetAllMovies")]
        public IActionResult GetAllMovies()
        {
            var movies = _moviesContext.movies_titles.Take(2000).ToList();
            return Ok(movies);
        }
        //[HttpGet("GetAllMoviesByGenre")]
        //public IActionResult GetAllMoviesByGenre(string genre)
        //{
        //    var movies = _moviesContext.movies_titles.Where(m => m.genre == genre).ToList();
        //    return Ok(movies);
        //}
    }

}
