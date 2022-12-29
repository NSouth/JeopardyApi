const ApiUrlMaker = {
    RandomQuestion: 'https://jeopardyapiazfunc20221203140757.azurewebsites.net/api/questions/random',
    MakeForQuestionById: questionId => `https://jeopardyapiazfunc20221203140757.azurewebsites.net/api/questions/${questionId}`
}

export default ApiUrlMaker;