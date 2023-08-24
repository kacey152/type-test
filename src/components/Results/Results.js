import React from "react";

function Results(props) {
    const {typedWords, time} = props
    const typingSpeed = typedWords.length / time * 60
    console.log(typedWords, time);

  return (
    <div className="container">
      <h1>Results</h1>
      <p>Typing Speed: {typingSpeed}</p>
    </div>
  );
}

export default Results;
