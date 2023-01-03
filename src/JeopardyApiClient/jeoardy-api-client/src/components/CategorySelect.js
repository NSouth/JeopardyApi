import React from 'react';
import ApiUrlMaker from "../AppUtils.js"
import AppConstants from '../AppConstants';
import 'react-select-search/style.css'
import './LoadSampleQuestion.css'
import AsyncSelect, { useAsync } from 'react-select/async';

function CategorySelect({onCategorySelect}) {

    function categoryChangeHandler(val) {
        console.log(val);
        if (onCategorySelect){
            onCategorySelect(val?.value);
        }
    }    

    function loadOptions (inputValue, callback) {
        fetch(ApiUrlMaker.MakeForCategorySearch(inputValue), { headers: AppConstants.ApiAuthHeaders.Categories })
            .then((response) => response.json())
            .then((data) => {
                const curOptions = data.Value.map(x => ({ value: x, label: x }));
                callback(curOptions);
            });
      };

    return <AsyncSelect className="inline-block w-72 mt-2" 
        loadOptions={loadOptions} 
        onChange={categoryChangeHandler} 
        isClearable
        placeholder='Type to select a category...' />
}

export default CategorySelect;