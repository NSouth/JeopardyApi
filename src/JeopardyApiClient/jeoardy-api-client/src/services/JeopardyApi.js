import ApiUrlMaker from "../utils/AppUtils.js";
import AppConstants from "../utils/AppConstants";

const JeopardyApi = {
  getQuestionsForCategory: (category, callback) => {
    const apiUrl = ApiUrlMaker.MakeForQuestionsByCategory(category);

    fetch(apiUrl, { headers: AppConstants.ApiAuthHeaders.Questions })
      .then((response) => response.json())
      .then((data) => {
        callback(data.Value);
      });
  },
  getRandomQuestion: (callback) => {
    const apiUrl = ApiUrlMaker.RandomQuestion;

    fetch(apiUrl, { headers: AppConstants.ApiAuthHeaders.RandomQuestion })
      .then((response) => response.json())
      .then((data) => {
        callback(data.Value);
      });
  },
  searchCategories: (inputValue, callback) => {
    fetch(ApiUrlMaker.MakeForCategorySearch(inputValue), {
      headers: AppConstants.ApiAuthHeaders.Categories,
    })
      .then((response) => response.json())
      .then((data) => {
        callback(data.Value);
        const curOptions = data.Value.map((x) => ({ value: x, label: x }));
        callback(curOptions);
      });
  },
};

export default JeopardyApi;
