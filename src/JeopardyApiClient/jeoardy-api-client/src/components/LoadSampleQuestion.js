import React, {useState} from 'react';
import Button from "./Button";
import ApiUrlMaker from "../AppUtils.js"
import AppConstants from '../AppConstants';
import CardFlippable from 'react-card-flippable';
import './LoadSampleQuestion.css'

function LoadSampleQuestion() {
    const [question, setQuestion] = useState('');
    const [answer,setAnswer] = useState('');
    const apiUrl = ApiUrlMaker.MakeForQuestionById('a962f6d9-6d96-49f4-a260-82215a331030');
    
    const frontContent = <div><h3>{answer}</h3></div>;
    const backContent = <div><h3>{question}</h3></div>;

    function loadData(){
        fetch(apiUrl, { headers: AppConstants.ApiAuthHeaders.QuestionById })
            .then((response) => response.json())
            .then((data) => {
                setQuestion(data.Value.question);
                setAnswer(data.Value.answer);
            });
        
    }

    return <div>
        <Button title='Load Sample' onclick={loadData}/>
        <div style={{marginTop: '20px'}}>
            <CardFlippable frontContent={frontContent} backContent={backContent} />
        </div>
        <p>{question}</p>
    </div>
}


export default LoadSampleQuestion;