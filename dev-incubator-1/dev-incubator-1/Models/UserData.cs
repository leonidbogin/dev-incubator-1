using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace dev_incubator_1.Models
{
    public class UserData
    {
        public int UserDataId { get; set; }
        public int? RangeFrom { get; set; }
        public int? RangeTo { get; set; }
        public float? Step { get; set; }
        public int? A { get; set; }
        public int? B { get; set; }
        public int? C { get; set; }

    }
}