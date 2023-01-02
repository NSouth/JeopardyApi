import React, {useState} from 'react';
import Button from "./Button";
import ApiUrlMaker from "../AppUtils.js"
import './LoadSampleQuestion.css'
import QuestionCard from './QuestionCard';
import UserGuess from './UserGuess';
import CategorySelect from './CategorySelect';
import AppConstants from '../AppConstants';


function ScoredGameArea() {
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showQuestionSide, setShowQuestionSide] = useState(false);
    const [guessResultDisplay, setGuessResultDisplay] = useState(<p> &nbsp</p>);
        
    function handleCategorySelect(val){
        setSelectedCategory(val);
    }

    function loadQuestion() {
        setCurrentQuestion(null);
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

        //Reset UI
        setGuessResultDisplay(null);
        setShowQuestionSide(false);
    }

    function onGuess(result){
        console.log('result: ' + result);
        const newGuessResultDisplay = result 
            ? <p className="text-green-600">Correct!</p>
            : <p className="text-red-600">Try again</p>;
        setGuessResultDisplay(newGuessResultDisplay);
    }

    return <div>
        <h1 className="text-4xl mb-4">Test yourself!</h1>
        <label className="text-left">Category (optional)</label>
        <br />
        <CategorySelect onCategorySelect={handleCategorySelect}/>
        <br /><br />
        <Button title='Get Question' onclick={loadQuestion}/>
        <QuestionCard questionObj={currentQuestion} initialShowQuestionSide={showQuestionSide} key={new Date().getTime()}/>
        <div className={currentQuestion ? '' : 'invisible'}> 
            {guessResultDisplay}
            <UserGuess expectedText={currentQuestion?.question} onResult={onGuess} />
        </div>        
        
    </div>
}

export default ScoredGameArea;