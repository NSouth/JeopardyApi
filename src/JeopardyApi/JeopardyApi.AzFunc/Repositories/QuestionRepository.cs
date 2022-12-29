using JeopardyApi.AzFunc.Interfaces;
using JeopardyApi.AzFunc.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Linq;
using Microsoft.Azure.Cosmos.Serialization.HybridRow;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JeopardyApi.AzFunc.Repositories
{
    public class QuestionRepository : IQuestionRepository
    {
        public string DatabaseName => "Jeopardy";
        public string QuestionsContainerName => "Questions";
        private readonly CosmosClient _cosmosClient;
        private readonly Microsoft.Azure.Cosmos.Container _container;

        public QuestionRepository(CosmosClient cosmosClient)
        {
            _cosmosClient = cosmosClient;
            _container = cosmosClient.GetContainer(DatabaseName, QuestionsContainerName);
        }

        public async Task<IList<Question>> ExecuteQuestionsQueryableAsync(IQueryable<Question> query, int maxResults = 10)
        {
            var results = new List<Question>();
            using (var setIterator = query.Take(maxResults).ToFeedIterator())
            {
                //Asynchronous query execution
                while (setIterator.HasMoreResults)
                {
                    foreach (var item in await setIterator.ReadNextAsync().ConfigureAwait(false))
                    {
                        {
                            results.Add(item);
                        }
                    }
                }
            }
            return results;
        }

        public async Task<Question> GetQuestionAsync(string questionId)
{
            var response = await _container.ReadItemAsync<Question>(
                   id: questionId,
                   partitionKey: new PartitionKey(1))
               .ConfigureAwait(false);

            return response.Resource;
        }

        private class IntContainer
        {
            public int Value { get; set; }
        }

        private static readonly Random random = new Random();

        public Task<Question> GetRandomQuestionAsync()
        {
            var randomIndex = random.Next(AppState.AllQuestionIds.Count);
            var randomId = AppState.AllQuestionIds[randomIndex];
            return GetQuestionAsync(randomId);
            // NEED TO FIX THIS. PERFORMANCE FOR SKIP/TAKE IS BAD!
//            var query = new QueryDefinition("SELECT COUNT(1) as 'Value' FROM c");
//            using var feedIterator = _container.GetItemQueryIterator<IntContainer>(query);

//            var getCountResults = new List<int>();
//            while (feedIterator.HasMoreResults)
//            {
//                foreach (var item in await feedIterator.ReadNextAsync().ConfigureAwait(false))
//{
//                    {
//                        getCountResults.Add(item.Value);
//                    }
//                }
//            }

//            var count = getCountResults.FirstOrDefault();
//            if (count == default)
//            {
//                count = 300000;
//            }

//            var randomIndex = Random.Shared.Next(0, count);

//            var finalResults = new List<Question>();
//            using (var setIterator = _container.GetItemLinqQueryable<Question>()
//                .Skip(randomIndex)    
//                .Take(1).ToFeedIterator())
//            {
//                //Asynchronous query execution
//                while (setIterator.HasMoreResults)
//                {
//                    foreach (var item in await setIterator.ReadNextAsync().ConfigureAwait(false))
//                    {
//                        {
//                            finalResults.Add(item);
//                        }
//                    }
//                }
//            }
//            return finalResults.First();
        }

        public IQueryable<Question> GetQuestionsQueryable()
        {
            return _container.GetItemLinqQueryable<Question>();
        }
    }
}
