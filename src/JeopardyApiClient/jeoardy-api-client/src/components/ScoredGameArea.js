import React, {useState} from 'react';
import Button from "./Button";
import ApiUrlMaker from "../AppUtils.js"
import './LoadSampleQuestion.css'
import QuestionCard from './QuestionCard';
import RandomQuestionButton from './RandomQuestionButton';

function ScoredGameArea() {
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [currentCategory, setCurrentCategory] = useState('');
        
    function handleQuestionResult(question, answer, category){
        setCurrentQuestion(question);
        setCurrentAnswer(answer);
        setCurrentCategory(category);
    }

    return <div>
        <h1 className="text-4xl mb-4">Explore random questions</h1>
        <RandomQuestionButton onResult={handleQuestionResult} />
        <QuestionCard question={currentQuestion} answer={currentAnswer} category={currentCategory} />
    </div>
}

export default ScoredGameArea;