import React, {useState} from 'react';
import Button from "./Button";
import ApiUrlMaker from "../AppUtils.js"
import AppConstants from '../AppConstants';
import ReactCardFlip from 'react-card-flip';
import './LoadSampleQuestion.css'
import QuestionCard from './QuestionCard';

function RandomQuestionButton({onResult}) {    
    const apiUrl = ApiUrlMaker.RandomQuestion;
    
    function loadData(){
        fetch(apiUrl, { headers: AppConstants.ApiAuthHeaders.RandomQuestion })
            .then((response) => response.json())
            .then((data) => {
                onResult(data.Value);
            });
        
    }

    return <div>
        <Button title='Next' onclick={loadData}/>
    </div>
}

export default RandomQuestionButton;