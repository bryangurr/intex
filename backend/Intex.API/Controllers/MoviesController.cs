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
            var result = _moviesContext.movies_titles.FirstOrDefault();
            return Ok(result);
        }

        [HttpGet("GetMovie")]
        public IActionResult GetMovie(int show_id)
        {
            var movie = _moviesContext.movies_titles.Where(m => m.show_id == show_id);
            return Ok(movie);

        }
    }

}
