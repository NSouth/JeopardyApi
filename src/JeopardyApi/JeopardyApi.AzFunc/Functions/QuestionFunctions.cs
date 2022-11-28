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
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "questions/{questionId:guid}")] HttpRequestData req,
            string questionId)
        {
            return new OkObjectResult(await _questionRepository.GetQuestionAsync(questionId).ConfigureAwait(false));
        }

        [Function(nameof(GetQuestions))]
        public async Task<IActionResult> GetQuestions(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "questions")] HttpRequestData req)
        {
            var queryParams = System.Web.HttpUtility.ParseQueryString(req.Url.Query);

            var containsText = queryParams["contains"];

            var query = _questionRepository.GetQuestionsQueryable();
            if (containsText != null)
            {
                query = query.Where(q => q.question.Contains(containsText, StringComparison.OrdinalIgnoreCase));
            }

            return new OkObjectResult(await _questionRepository.ExecuteQuestionsQueryableAsync(query).ConfigureAwait(false));
        }

        [Function(nameof(GetRandomQuestion))]
        public async Task<IActionResult> GetRandomQuestion(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "questions/random")] HttpRequestData req)
        {
            return new OkObjectResult(await _questionRepository.GetRandomQuestionAsync().ConfigureAwait(false));
        }
    }
}
