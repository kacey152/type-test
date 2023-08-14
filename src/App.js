import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Mode from "./components/Mode/Mode";
import WordPrompt from "./components/WordPrompt/WordPrompt";
import Results from "./components/Results/Results";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [time, setTime] = useState(30); //total time countdown when reset
  const [timer, setTimer] = useState(30); //current timer countdown
  const [timerActive, setTimerActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const timerRef = useRef(timer);
  const timeRef = useRef(time);

  // Update refs whenever timer or time change
  useEffect(() => {
    timerRef.current = timer;
    timeRef.current = time;
  }, [timer, time]);

  //timer logic
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setShowResults(true);
            setTimerActive(false);
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else if (!timerActive && !timerActive && timerRef.current !== timeRef.current) {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Cleanup on unmount
  }, [timerActive]);

  //set the timer to a new value
  const changeTime = (newTime) => {
    setTime(newTime);
    setTimer(newTime);
    setTimerActive(false);
    setResetKey(resetKey + 1); // resets the word prompt component
  };

  //resets game
  const reset = () => {
    setTimerActive(false);
    setTimer(time);
    setResetKey(resetKey + 1); // resets the word prompt component
  };


  return (
    <div className="bg-success-subtle bg-gradient fullHeight">
      <NavBar />
      <Mode handleTime={changeTime} timer={timer} reset={reset} />
      {showResults ? (
        <Results />
      ) : (
        <WordPrompt
          key={resetKey}
          timerActive={timerActive}
          timer={timer}
          setTimerActive={setTimerActive}
          time={time}
        />
      )}
    </div>
  );
}

export default App;
