import React, {useState} from 'react';
import Button from "./Button";
import ApiUrlMaker from "../AppUtils.js"
import AppConstants from '../AppConstants';

function QuestionForCategoryButton({category, onResult}) {    
    const [curCategory, setCurCategory] = useState(category);
    const [curQuestions, setCurQuestions] = useState([]);

    const apiUrl = ApiUrlMaker.MakeForQuestionsByCategory(category);
    
    function loadData(){
        fetch(apiUrl, { headers: AppConstants.ApiAuthHeaders.Questions })
            .then((response) => response.json())
            .then((data) => {
                setCurQuestions(data.Value);
                onResult(curQuestions);
            });
        
    }

    return <div>
        <Button title='Get Question' onclick={loadData}/>
    </div>
}

export default QuestionForCategoryButton;