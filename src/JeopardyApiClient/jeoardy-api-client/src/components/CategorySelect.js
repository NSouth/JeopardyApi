import React from 'react';
import 'react-select-search/style.css'
import AsyncSelect, { useAsync } from 'react-select/async';
import JeopardyApi from '../services/JeopardyApi';

function CategorySelect({onCategorySelect}) {

    function categoryChangeHandler(val) {
        console.log(val);
        if (onCategorySelect){
            onCategorySelect(val?.value);
        }
    }    

    function loadOptions (inputValue, callback) {
        JeopardyApi.searchCategories(inputValue, data => {
            const curOptions = data.map(x => ({ value: x, label: x }));
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