import React, {useState} from 'react';
import Button from "./Button";
import ReactCardFlip from 'react-card-flip';
import './LoadSampleQuestion.css'

function QuestionCard({questionObj, initialShowQuestionSide}) {
    // const [question, setQuestion] = useState(questionParam);
    // const [answer,setAnswer] = useState(answerParam);
    const [showQuestionSide, setShowQuestionSide] = useState(initialShowQuestionSide ?? false);            

    function flipCard(){
        setShowQuestionSide(!showQuestionSide);
    }

    function sanitizeText(text) {
        return text?.replace('\\"', '"');
    }

    return <div>
        <div className={`mt-0`} >
            <ReactCardFlip isFlipped={showQuestionSide} containerClassName='question-card-container'>
                <div key='front' onClick={flipCard} className='question-card-inner'>
                <p className="absolute left-1 text-xs">{questionObj?.category}</p>
                <p className="absolute right-1 text-xs">{questionObj ? `$${questionObj.value}` : ''}</p>
                    <div>
                        <h3 className="text-xl m-1">{sanitizeText(questionObj?.answer)}</h3>   
                    </div>             
                    <span className={`${questionObj?.question ? 'visible' : 'invisible'}`}>
                        <Button title={`Flip to see Question`}/>
                    </span>
                </div>
                <div key='back' onClick={flipCard} className='question-card-inner'>
                    <div>
                        <h3 className="text-xl m-1">{sanitizeText(questionObj?.question)}</h3>
                    </div>
                    <span className={`${questionObj?.question ? 'visible' : 'invisible'}`}>
                        <Button title={`Flip to see Answer`}/>
                    </span>

                </div>
            </ReactCardFlip>
        </div>
    </div>
}

export default QuestionCard;