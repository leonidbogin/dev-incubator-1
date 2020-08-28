using dev_incubator_1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace dev_incubator_1.Controllers
{
    public class HomeController : Controller
    {
        PointContext db;
        public ActionResult Index()
        {
            return View();
        }
    }
}