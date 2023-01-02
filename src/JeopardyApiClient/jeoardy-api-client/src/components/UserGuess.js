import React, {useState} from 'react';
import Button from "./Button";
import ApiUrlMaker from "../AppUtils.js"
import AppConstants from '../AppConstants';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import './LoadSampleQuestion.css'

function UserGuess({expectedText, onResult}) {

    const [userInput, setUserInput] = useState('');

    function onInputChange(e){
        setUserInput(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        onResult(userInput.toLowerCase() === expectedText.toLowerCase());        
    }

    return <form onSubmit={onSubmit}>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input" type="text" id="guessInput" value={userInput} onChange={onInputChange}></input>
            <label className="mdl-textfield__label" htmlFor="guessInput">Your guess</label>
        </div>
        {/* <input value={userInput} onChange={onInputChange}></input> */}
        <span className='ml-5' ><Button title='Submit' /></span>
    </form>
}

export default UserGuess;