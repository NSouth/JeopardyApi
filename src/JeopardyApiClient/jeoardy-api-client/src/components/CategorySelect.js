import React from "react";
import "react-select-search/style.css";
import AsyncSelect from "react-select/async";
import { searchCategories } from "../services/JeopardyApi";

function CategorySelect({ onCategorySelect }) {
  function categoryChangeHandler(val) {
    console.log(val);
    if (onCategorySelect) {
      onCategorySelect(val?.value);
    }
  }

  async function loadOptions(inputValue, callback) {
    const result = await searchCategories(inputValue);
    const curOptions = result.map((x) => ({ value: x, label: x }));
    callback(curOptions);
  }

  return (
    <AsyncSelect
      className="inline-block w-72 mt-2"
      loadOptions={loadOptions}
      onChange={categoryChangeHandler}
      isClearable
      placeholder="Type to select a category..."
    />
  );
}

export default CategorySelect;
