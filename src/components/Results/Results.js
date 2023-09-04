import React from "react";


function Results(props) {
    const {typedWords, time, mode, stopWatch} = props;
    let typingSpeed;
    if (mode === "time"){
      typingSpeed = typedWords.length / time * 60;
    } else if (mode === "words") {
      typingSpeed = typedWords.length / stopWatch * 60;
    } else {
      typingSpeed = "Error Mode not found";
    }

    return (
      <div className="container mt-5 results">
        <div className="card text-bg-dark">
          <div className="card-header">
            Results
          </div>
          <div className="card-body">
            <h5 className="card-title">Typing Speed</h5>
            <p className="card-text">{typingSpeed.toFixed(2)} words per minute</p>
          </div>
          <div className="card-body">
            <h5 className="card-title">Time Taken</h5>
            <p className="card-text">{mode === "time" ? time : stopWatch} s</p>
          </div>
        </div>
      </div>
    );
}

export default Results;
