using JeopardyApi.AzFunc.Interfaces;
using JeopardyApi.AzFunc.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices(services =>
    {
        var accountEndpoint = Environment.GetEnvironmentVariable("COSMOS_ENDPOINT")!;
        var authKeyOrResourceToken = Environment.GetEnvironmentVariable("COSMOS_KEY")!;

        services.AddScoped<IQuestionRepository>(_ => new QuestionRepository(new Microsoft.Azure.Cosmos.CosmosClient(accountEndpoint, authKeyOrResourceToken)));
    })
    .Build();

host.Run();
