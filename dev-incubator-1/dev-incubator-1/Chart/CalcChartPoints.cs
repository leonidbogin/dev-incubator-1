using dev_incubator_1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace dev_incubator_1.Chart
{
    public static class CalcChartPoints
    {
        public static List<Point> GetPoints(UserData userData)
        {
            List<Point> points = new List<Point>();
            for (double x = userData.RangeFrom; x <= userData.RangeTo; x += userData.Step)
            {
                points.Add(new Point()
                {
                    PointX = x,
                    PointY = Func(x, userData.A, userData.B, userData.C)
                });
            }
            return points;
        }

        private static double Func(double x, int a, int b, int c)
        {
            return a * Math.Pow(x, 2) + b * x + c;
        }
    }
}