import React from 'react';

export default function Speech ({json}) {
    const synthRef = React.useRef(window.speechSynthesis);

    const choose = (choice) => {
        const utter = new SpeechSynthesisUtterance(choice);
        synthRef.current.speak(utter);
    };

    return (
        <div className="speech">
            <div className="group">
                <button onClick={() => choose(json.description === undefined ? "Testing" : json.description)}>Speech</button>
            </div>
        </div>
    );
}

