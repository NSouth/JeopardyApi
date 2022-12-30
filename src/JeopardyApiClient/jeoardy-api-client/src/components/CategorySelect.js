import React, {useState} from 'react';
import Button from "./Button";
import ApiUrlMaker from "../AppUtils.js"
import AppConstants from '../AppConstants';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import './LoadSampleQuestion.css'

function CategorySelect({onCategorySelect}) {

    function categoryChangeHandler(val) {
        console.log(val);
        if (onCategorySelect){
            onCategorySelect(val);
        }
    }    

    let curOptions = [];

    function getCategoryOptions(query) {
        if ((!query || query.length < 2)){
            return curOptions;
        }
        return new Promise((resolve, reject) => {
            fetch(ApiUrlMaker.MakeForCategorySearch(query), { headers: AppConstants.ApiAuthHeaders.Categories })
            .then((response) => response.json())
            .then((data) => {
                curOptions = data.Value.map(x => ({ value: x, name: x }));
                resolve(curOptions);
            })
            .catch(reject);
        });
    }

    return <div style={{display: 'inline-block'}}>
        <SelectSearch 
        getOptions={getCategoryOptions}
        debounce={200}
        name="category" placeholder="Type for a category (optional)" search onChange={categoryChangeHandler} />
        {/* <input Value={input} />
        <Button title='Load Sample' onclick={loadData}/>
        <div className={`mt-0 ${question ? 'visible' : 'invisible'}`} >
            <ReactCardFlip isFlipped={showQuestion} containerClassName='question-card-container'>
                <div key='front' onClick={flipCard} className='question-card-inner'>
                    <div>
                        <h3 className="text-xl m-1">{sanitizeText(answer)}</h3>   
                    </div>             
                    <Button title={`Flip to see Question`}/>
                </div>
                <div key='back' onClick={flipCard} className='question-card-inner'>
                    <div>
                        <h3 className="text-xl m-1">{sanitizeText(question)}</h3>
                    </div>
                    <Button title={`Flip to see Answer`}/>
                </div>
            </ReactCardFlip>
        </div> */}
    </div>
}

export default CategorySelect;