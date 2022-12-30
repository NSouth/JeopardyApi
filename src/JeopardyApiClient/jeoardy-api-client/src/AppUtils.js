const ApiUrlMaker = {
    RandomQuestion: 'https://jeopardyapiazfunc20221203140757.azurewebsites.net/api/questions/random',
    MakeForQuestionById: questionId => `https://jeopardyapiazfunc20221203140757.azurewebsites.net/api/questions/${questionId}`,
    MakeForCategorySearch: cat => `https://jeopardyapiazfunc20221203140757.azurewebsites.net/api/questions/categories?contains=${encodeURIComponent(cat)}`,
    MakeForQuestionsByCategory: cat => `https://jeopardyapiazfunc20221203140757.azurewebsites.net/api/questions?category=${encodeURIComponent(cat)}`
}

export default ApiUrlMaker;