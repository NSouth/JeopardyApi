using System.Collections;
using System.Collections.Generic;
using System.Net;
using JeopardyApi.AzFunc.Interfaces;
using JeopardyApi.AzFunc.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Linq;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace JeopardyApi.AzFunc
{
    public class Function1
    {
        private readonly ILogger _logger;
        private readonly IQuestionRepository _questionRepository;

        public Function1(ILoggerFactory loggerFactory, IQuestionRepository questionRepository)
        {
            _logger = loggerFactory.CreateLogger<Function1>();
            _questionRepository = questionRepository;
        }

        [Function("Function1")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var question1b = await _questionRepository.GetQuestionAsync("a962f6d9-6d96-49f4-a260-82215a331030").ConfigureAwait(false);

            var questionsQuery = _questionRepository.GetQuestionsQueryable()
                .Take(10);
            var results1 = await _questionRepository.ExecuteQuestionsQueryableAsync(questionsQuery).ConfigureAwait(false);

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString("Welcome to Azure Functions!");

            return response;
        }
    }
}
