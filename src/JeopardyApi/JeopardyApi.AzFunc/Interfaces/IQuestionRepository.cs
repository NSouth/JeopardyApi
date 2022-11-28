using JeopardyApi.AzFunc.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JeopardyApi.AzFunc.Interfaces
{
    public interface IQuestionRepository
    {
        public Task<Question> GetQuestionAsync(string questionId);
        public IQueryable<Question> GetQuestionsQueryable();
        public Task<IList<Question>> ExecuteQuestionsQueryableAsync(IQueryable<Question> query, int maxResults = 10);
        Task<Question> GetRandomQuestionAsync();
    }
}
