import React, {useEffect, useState} from 'react';
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
    const [numCorrect, setNumCorrect] = useState(0);
    const [numAttempts, setNumAttempts] = useState(0);
    const [acceptGuesses, setAcceptGuesses] = useState(true);
    const [categoryQuestions, setCategoryQuestions] = useState([]);
    const [categoryQuestionIndex, setCategoryQuestionIndex] = useState(0);
        
    function handleCategorySelect(val){
        setSelectedCategory(val);
        setCategoryQuestions([]);
        setCategoryQuestionIndex(0);
    }

    function loadQuestion() {
        if (selectedCategory) {
            if (categoryQuestions.length > 0){
                if (categoryQuestionIndex < categoryQuestions.length - 1){
                    const newIndex = categoryQuestionIndex + 1;
                    setCategoryQuestionIndex(newIndex);
                    setCurrentQuestion(categoryQuestions[newIndex]);
                }
                else {
                    setAcceptGuesses(false);
                    return;
                }
            } else {
                const apiUrl = ApiUrlMaker.MakeForQuestionsByCategory(selectedCategory);
            
                fetch(apiUrl, { headers: AppConstants.ApiAuthHeaders.Questions })
                    .then((response) => response.json())
                    .then((data) => {
                        setCategoryQuestions(data.Value);
                        setCurrentQuestion(data.Value[0]);
                    }
                );
            }

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
        setAcceptGuesses(true);
        setShowQuestionSide(false);
    }

    function onGuess(result){
        if(!acceptGuesses){
            return;
        }
        console.log('result: ' + result);
        const newGuessResultDisplay = result 
            ? <p className="text-green-600">Correct!</p>
            : <p className="text-red-600">Try again</p>;
        setNumAttempts(numAttempts + 1);
        setNumCorrect(numCorrect + (result ? 1 : 0));
        setGuessResultDisplay(newGuessResultDisplay);
        setAcceptGuesses(false);
    }

    useEffect(() => loadQuestion(), []); // empty array ensures useEffect only runs once

    return <div>
        <h1 className="text-3xl">Welcome to the Jeopardy collection</h1>
        <h3>Explore a collection of Jeopardy questions and answers!</h3>
        <label className="text-left">Category (optional)</label>
        <br />
        <CategorySelect onCategorySelect={handleCategorySelect}/>
        <br /><br />
        <Button title='Load Another' onclick={loadQuestion}/>
        <div className={categoryQuestions.length > 0 && categoryQuestionIndex >= categoryQuestions.length - 1 ? '' : 'invisible'}> 
            <p className="text-orange-700">No more questions available in this category</p>
        </div> 
        <QuestionCard questionObj={currentQuestion} initialShowQuestionSide={showQuestionSide} key={new Date().getTime()}/>
        <div className={currentQuestion ? '' : 'invisible'}> 
            {guessResultDisplay ?? <br />}
            <p>Score: {numCorrect} of {numAttempts}</p>
            <UserGuess expectedText={currentQuestion?.question} onResult={onGuess} />
        </div>        

        
    </div>
}

export default ScoredGameArea;