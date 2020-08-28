using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace dev_incubator_1.Models
{
    public class Point
    {
        public int PointId { get; set; }
        public UserData ChartId { get; set; }
        public int PointX { get; set; }
        public int PointY { get; set; }
    }
}