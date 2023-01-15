import ApiUrlMaker from "../utils/AppUtils.js";
import AppConstants from "../utils/AppConstants";
import MakeGetRequest from "./ApiWrapper";

const getCluesForCategory = async (
  category,
  url = null,
  headers = AppConstants.ApiAuthHeaders.Questions
) => {
  url = url ?? ApiUrlMaker.MakeForCluesByCategory(category);
  const response = await MakeGetRequest(url, headers);
  return response.Value;
};

const getRandomClue = async (
  url = ApiUrlMaker.RandomClue,
  headers = AppConstants.ApiAuthHeaders.RandomClue
) => {
  const response = await MakeGetRequest(url, headers);
  return response.Value;
};

const searchCategories = async (
  searchValue,
  url = null,
  headers = AppConstants.ApiAuthHeaders.Categories
) => {
  url = url ?? ApiUrlMaker.MakeForCategorySearch(searchValue);
  const response = await MakeGetRequest(url, headers);
  return response.Value;
};

export { getCluesForCategory, getRandomClue, searchCategories };
