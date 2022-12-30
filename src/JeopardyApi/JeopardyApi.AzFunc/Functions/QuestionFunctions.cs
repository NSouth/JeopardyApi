using JeopardyApi.AzFunc.Interfaces;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace JeopardyApi.AzFunc.Funcitons
{
    public class QuestionFunctions
    {
        private readonly ILogger _logger;
        private readonly IQuestionRepository _questionRepository;

        public QuestionFunctions(ILoggerFactory loggerFactory, IQuestionRepository questionRepository)
        {
            _logger = loggerFactory.CreateLogger<QuestionFunctions>();
            _questionRepository = questionRepository;
        }

        [Function(nameof(GetQuestion))]
        public async Task<IActionResult> GetQuestion(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "questions/{questionId:guid}")] HttpRequestData req,
            string questionId)
        {
            return new OkObjectResult(await _questionRepository.GetQuestionAsync(questionId).ConfigureAwait(false));
        }

        [Function(nameof(GetQuestions))]
        public async Task<IActionResult> GetQuestions(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "questions")] HttpRequestData req)
        {
            var queryParams = System.Web.HttpUtility.ParseQueryString(req.Url.Query);

            var containsText = queryParams["contains"];
            var categoryText = queryParams["category"];

            var query = _questionRepository.GetQuestionsQueryable();
            if (containsText != null)
            {
                query = query.Where(q => q.question.Contains(containsText, StringComparison.OrdinalIgnoreCase));
            }
            if (categoryText != null)
            {
                query = query.Where(q => q.category.Equals(categoryText, StringComparison.OrdinalIgnoreCase));
            }

            return new OkObjectResult(await _questionRepository.ExecuteQuestionsQueryableAsync(query).ConfigureAwait(false));
        }

        [Function(nameof(GetCategories))]
        public async Task<IActionResult> GetCategories(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "questions/categories")] HttpRequestData req)
        {
            var queryParams = System.Web.HttpUtility.ParseQueryString(req.Url.Query);

            int maxItemCount = 100;
            var containsText = queryParams["contains"];
            if (string.IsNullOrWhiteSpace(containsText))
            {
                maxItemCount = 100;
            }
            var query = _questionRepository.GetQuestionsQueryable(maxItemCount: maxItemCount);
            IQueryable<string> ? categoryQuery = null;
            if (string.IsNullOrWhiteSpace(containsText))
            {
                categoryQuery = query
                    .Select(q => q.category)
                    .OrderBy(q => q)
                    .Distinct();
            }
            else
            {
                categoryQuery = query.Where(q => q.category.Contains(containsText, StringComparison.OrdinalIgnoreCase))
                    .Select(q => q.category)
                    .Distinct();
            }

            return new OkObjectResult(await _questionRepository.ExecuteQuestionsQueryableAsync(categoryQuery, maxResults: maxItemCount).ConfigureAwait(false));
        }

        [Function(nameof(GetRandomQuestion))]
        public async Task<IActionResult> GetRandomQuestion(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "questions/random")] HttpRequestData req)
        {
            return new OkObjectResult(await _questionRepository.GetRandomQuestionAsync().ConfigureAwait(false));
        }
    }
}
