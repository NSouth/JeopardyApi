import React, {useState} from 'react';
import Button from "./Button";
import ApiUrlMaker from "../AppUtils.js"
import './LoadSampleQuestion.css'
import QuestionCard from './QuestionCard';
import RandomQuestionButton from './RandomQuestionButton';

function GameArea() {
    const [currentQuestion, setCurrentQuestion] = useState('');
        
    function handleQuestionResult(question){
        setCurrentQuestion(question);
    }

    return <div>
        <h1 className="text-4xl mb-4">Explore random questions</h1>
        <RandomQuestionButton onResult={handleQuestionResult} />
        <QuestionCard question={currentQuestion} />
    </div>
}

export default GameArea;