using dev_incubator_1.Chart;
using dev_incubator_1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace dev_incubator_1.Controllers
{
    public class HomeController : Controller
    {
        Context db = new Context();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult History()
        {
            var dbUserDatas = db.UserDatas;
            ViewBag.UserDatas = dbUserDatas.OrderByDescending(u => u.UserDataId);

            var dbPoints = db.Points;
            ViewBag.Points = dbPoints.OrderByDescending(u => u.PointId);

            return View();
        }

        public JsonResult SendDataJson(UserData userData)
        {
            if (DataValidation.Valadation(userData))
            {
                var dbPoints = db.Points;
                List<Point> newPoints = CalcPoints.GetPoints(userData);
                foreach (Point point in newPoints)
                    dbPoints.Add(point);

                var dbUserDatas = db.UserDatas;
                dbUserDatas.Add(userData);

                db.SaveChanges();
                
                return Json(newPoints);
            }
            else return Json(false);
        }
    }
}