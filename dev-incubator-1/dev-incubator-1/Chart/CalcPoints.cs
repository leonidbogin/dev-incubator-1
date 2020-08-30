using dev_incubator_1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace dev_incubator_1.Chart
{
    public static class CalcPoints
    {
        //Calculate points for plotting
        public static List<Point> GetPoints(UserData userData)
        {
            List<Point> points = new List<Point>();
            for (double x = userData.RangeFrom.Value; x <= userData.RangeTo; x += userData.Step.Value)
            {
                points.Add(new Point()
                {
                    ChartId = userData,
                    PointX = x,
                    PointY = Func(x, userData.A.Value, userData.B.Value, userData.C.Value)
                }); ;
            }
            return points;
        }

        //Function calculation
        private static double Func(double x, int a, int b, int c)
        {
            return a * Math.Pow(x, 2) + b * x + c;
        }
    }
}