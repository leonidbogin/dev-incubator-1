using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace dev_incubator_1.Models
{
    public class Context : DbContext
    {
        public DbSet<Point> Points { get; set; }
        public DbSet<UserData> UserDatas { get; set; }
        public Context()
        {
            Database.SetInitializer<Context>(new CreateDatabaseIfNotExists<Context>());
        }
    }
}