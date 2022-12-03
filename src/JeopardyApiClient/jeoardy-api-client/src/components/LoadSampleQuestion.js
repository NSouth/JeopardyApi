import React, {useState} from 'react';
import Button from "./Button";

function LoadSampleQuestion(props) {
    const [question, setQuestion] = useState('');
    const apiUrl = 'https://jeopardyapiazfunc20221203140757.azurewebsites.net/api/questions/a962f6d9-6d96-49f4-a260-82215a331030';
    function loadData(){
        fetch(apiUrl,
            {
                headers: {
                    'x-functions-key': 'eqZZOEEfRPpjijcexTdbSUF0CO3Lyi_3v06_G7eLb-nEAzFuWc-IGQ=='
                }
            })
            .then((response) => response.json())
            .then((data) => {console.log(data);setQuestion(data.Value.answer);});
        
    }


    return <div>
        <Button title='Load Sample' onclick={loadData}/>
        <p>{question}</p>
    </div>
}


export default LoadSampleQuestion;