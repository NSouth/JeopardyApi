using System.Collections;
using System.Collections.Generic;
using System.Net;
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

        public string DatabaseName => "Jeopardy";
        public string QuestionsContainerName => "Questions";

        public Function1(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<Function1>();
        }

        [Function("Function1")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            using CosmosClient cosmosClient = new(
                accountEndpoint: Environment.GetEnvironmentVariable("COSMOS_ENDPOINT")!,
                authKeyOrResourceToken: Environment.GetEnvironmentVariable("COSMOS_KEY")!
            );

            var container = cosmosClient.GetContainer(DatabaseName, QuestionsContainerName);
            //var containerResult = await db.Database.CreateContainerIfNotExistsAsync(
            //    id: QuestionsContainerName,
            //    partitionKeyPath: "/partition")
            //    .ConfigureAwait(false);

            var question1 = await container.ReadItemAsync<Question>(
                id: "a962f6d9-6d96-49f4-a260-82215a331030",
                partitionKey: new PartitionKey(1))
                .ConfigureAwait(false);

            var firstQuestionsQuery = new QueryDefinition(
                    query: "SELECT TOP 10 * FROM Questions"
                );

            using var feedIterator = container.GetItemQueryIterator<Question>(queryDefinition: firstQuestionsQuery);

            var foundQuestions = new List<Question>();
            while (feedIterator.HasMoreResults)
            {
                FeedResponse<Question> feedResponse = await feedIterator.ReadNextAsync();
                foreach (Question item in feedResponse)
                {
                    foundQuestions.Add(item);
                    Console.WriteLine($"Found item:\t{item.answer}");
                }
            }

            var foundQuestions2 = new List<Question>();
            using (var setIterator = container.GetItemLinqQueryable<Question>()
                      .Take(10)
                      .ToFeedIterator())
            {
                //Asynchronous query execution
                while (setIterator.HasMoreResults)
                {
                    foreach (var item in await setIterator.ReadNextAsync())
                    {
                        {
                            foundQuestions2.Add(item);
                            Console.WriteLine(item.answer);
                        }
                    }
                }
            }

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString("Welcome to Azure Functions!");

            return response;
        }
    }
}
