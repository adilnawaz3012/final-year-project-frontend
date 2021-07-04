import React from "react";
import { useSpeechSynthesis } from "react-speech-kit"; 

const Speech = ({json}) => {
    const { speak }  = useSpeechSynthesis();
    return (
        <div>
           <button type="button" className="btn btn-primary" aria-hidden="true" style={{marginLeft : "10px"}} disabled={!json.description} onClick={() => speak({ text : json.description})}><i class="fa fa-volume-up"></i></button>            
        </div>
    );
}

export default Speech;
