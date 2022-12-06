import React, {useState} from 'react';
import Button from "./Button";
import ApiUrlMaker from "../AppUtils.js"
import AppConstants from '../AppConstants';
import ReactCardFlip from 'react-card-flip';
import './LoadSampleQuestion.css'

function LoadSampleQuestion() {
    const [question, setQuestion] = useState('');
    const [answer,setAnswer] = useState('');
    const [showQuestion,setShowQuestion] = useState(false);
    const apiUrl = ApiUrlMaker.MakeForQuestionById('a962f6d9-6d96-49f4-a260-82215a331030');
    
    function loadData(){
        fetch(apiUrl, { headers: AppConstants.ApiAuthHeaders.QuestionById })
            .then((response) => response.json())
            .then((data) => {
                setQuestion(data.Value.question);
                setAnswer(data.Value.answer);
            });
        
    }

    function flipCard(){
        setShowQuestion(!showQuestion);
    }

    return <div>
        <Button title='Load Sample' onclick={loadData}/>
        <div className={`mt-0 ${question ? 'visible' : 'invisible'}`} >
            <ReactCardFlip isFlipped={showQuestion} containerClassName='question-card-container'>
                <div key='front' onClick={flipCard} className='question-card-inner'>
                    <div>
                        <h3 className="text-3xl">{answer}</h3>   
                    </div>             
                    <Button title={`Flip to see Question`}/>
                </div>
                <div key='back' onClick={flipCard} className='question-card-inner'>
                    <div>
                        <h3 className="text-3xl">{question}</h3>
                    </div>
                    <Button title={`Flip to see Answer`}/>
                </div>
            </ReactCardFlip>
        </div>
    </div>
}

export default LoadSampleQuestion;