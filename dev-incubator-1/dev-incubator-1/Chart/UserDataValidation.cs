using dev_incubator_1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace dev_incubator_1.Chart
{
    public static class UserDataValidation
    {
        public static bool Valadation(UserData userData)
        {
            if (!userData.A.HasValue
                || !userData.B.HasValue
                || !userData.C.HasValue
                || !userData.RangeFrom.HasValue
                || !userData.RangeTo.HasValue
                || !userData.Step.HasValue
                || userData.Step.Value <= 0
                || userData.RangeFrom.Value > userData.RangeTo.Value) return false;
            else return true;
        }
    }
}