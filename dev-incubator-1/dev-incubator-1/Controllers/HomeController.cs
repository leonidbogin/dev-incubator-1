using dev_incubator_1.Chart;
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

        public JsonResult SendDataJson(UserData userData)
        {
            if (UserDataValidation.Valadation(userData))
                return Json(CalcChartPoints.GetPoints(userData));
            else return Json(false);
        }
    }
}