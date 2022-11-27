using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JeopardyApi.AzFunc.Models
{
    public class Question
    {
        public int round { get; set; }
        public int value { get; set; }
        public string daily_double { get; set; }
        public string category { get; set; }
        public string comments { get; set; }
        public string answer { get; set; }
        public string question { get; set; }
        public DateTime air_date { get; set; }
        public string notes { get; set; }
        public int partition { get; set; }
        public string id { get; set; }
        public string _rid { get; set; }
        public string _self { get; set; }
        public string _etag { get; set; }
        public string _attachments { get; set; }
        public int _ts { get; set; }
    }

}
