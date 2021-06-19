import React from "react";
import { useSpeechSynthesis } from "react-speech-kit"; 

const Speech = ({json}) => {
    const [value, setValue] = React.useState('');
    const { speak }  = useSpeechSynthesis();
    return (
        <div className="speech">
            <div className="group">
                <button onClick={() => speak({ text : json.description})}>Speech</button>
            </div>
        </div>
    );
}


export default Speech;