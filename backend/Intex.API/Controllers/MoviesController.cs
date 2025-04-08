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

        [HttpGet]
        public ActionResult<object> Get()
        {
            var result = new
            {
                MoviesTitles = _moviesContext.movies_titles.ToList(),
                MoviesUsers = _moviesContext.movies_users.ToList(),
                MoviesRatings = _moviesContext.movies_ratings.ToList()
            };

            return Ok(result);
        }
    }
}
