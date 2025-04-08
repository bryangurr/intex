﻿using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Intex.API.Data
{
    public class movies_ratings
    {
        [Key]
        public int user_id { get; set; }
        public int? show_id { get; set; }
        public int? rating { get; set; }
    }
}
