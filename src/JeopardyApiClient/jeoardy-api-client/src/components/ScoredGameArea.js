import React, {useState} from 'react';
import Button from "./Button";
import ApiUrlMaker from "../AppUtils.js"
import './LoadSampleQuestion.css'
import QuestionCard from './QuestionCard';
import CategorySelect from './CategorySelect';
import AppConstants from '../AppConstants';

function ScoredGameArea() {
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
        
    function handleQuestionResult(question){
        setCurrentQuestion(question);
    }

    function handleCategorySelect(val){
        setSelectedCategory(val);
    }

    function loadQuestion() {
        if (selectedCategory) {
            const apiUrl = ApiUrlMaker.MakeForQuestionsByCategory(selectedCategory);
        
            fetch(apiUrl, { headers: AppConstants.ApiAuthHeaders.Questions })
                .then((response) => response.json())
                .then((data) => {
                    var item = data.Value.find(x => true); // first or default
                    setCurrentQuestion(item);
                }
            );
        }
        else {
            const apiUrl = ApiUrlMaker.RandomQuestion;
        
            fetch(apiUrl, { headers: AppConstants.ApiAuthHeaders.RandomQuestion })
                .then((response) => response.json())
                .then((data) => {
                    var item = data.Value;
                    setCurrentQuestion(item);
                }
            );
        }
    }

    return <div>
        <h1 className="text-4xl mb-4">Test yourself!</h1>
        <label className="text-left">Category (optional)</label>
        <br />
        <CategorySelect onCategorySelect={handleCategorySelect}/>
        <br /><br />
        <Button title='Get Question' onclick={loadQuestion}/>
        <QuestionCard questionObj={currentQuestion} />
    </div>
}

export default ScoredGameArea;