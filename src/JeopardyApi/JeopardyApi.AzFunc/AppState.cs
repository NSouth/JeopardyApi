using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JeopardyApi.AzFunc
{
    public static class AppState
    {
        public static readonly List<string> AllQuestionIds;
        static AppState()
        {
            AllQuestionIds = File.ReadAllLines(@".\AllQuestionIds.txt")
                .ToList();
        }
    }
}
