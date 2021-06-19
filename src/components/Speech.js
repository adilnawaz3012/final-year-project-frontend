import React from "react";
import { useSpeechSynthesis } from "react-speech-kit"; 

const Speech = ({json}) => {
    const [value, setValue] = React.useState('');
    const { speak }  = useSpeechSynthesis();
    return (
        <div className="speech">
            {/* <div className="group">
                <textarea row="10" value={value} onChange={(e) => setValue(e.target.value)}>
                </textarea>
            </div> */}
            <div className="group">
                <button onClick={() => speak({ text : json.description})}>Speech</button>
            </div>
        </div>
    );
}


export default Speech;