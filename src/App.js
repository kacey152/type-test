import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Mode from "./components/Mode/Mode";
import WordPrompt from "./components/WordPrompt/WordPrompt";
import React, { useState, useEffect, useRef } from "react";
import { ProgressBar } from "./components/ProgressBar/ProgressBar";

function App() {
  const [time, setTime] = useState(30); //total time countdown when reset
  const [target, setTarget] = useState(30); // target number of words
  const [timer, setTimer] = useState(30); //current timer countdown
  const [timerActive, setTimerActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [mode, setMode] = useState("time"); //time, words
  const [stopWatch, setStopWatch] = useState(0);
  const [correctWords, setCorrectWords] = useState(0); //number of correct words

  const timerRef = useRef(timer);
  const timeRef = useRef(time);
  const stopWatchRef = useRef(stopWatch);
  const correctWordsRef = useRef(correctWords);
  const targetRef = useRef(target);

  // Update refs whenever timer or time change
  useEffect(() => {
    timerRef.current = timer;
    timeRef.current = time;
    stopWatchRef.current = stopWatch;
    correctWordsRef.current = correctWords;
    targetRef.current = target;
  }, [timer, time, stopWatch, correctWords, target]);
  

  //Function that triggers the clock when first input detected

  useEffect(() => {
    let interval;
    if (mode === "time") {
      //Timer Logic
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
      } else if (!timerActive && timerRef.current !== timeRef.current) {
        clearInterval(interval);
      }
    } else if (mode === "words") {
      //Measure time for fixed number of words
      if (timerActive) {
        interval = setInterval(() => {
          console.log(correctWordsRef.current)
          if (targetRef.current - correctWordsRef.current === 0) {
            setShowResults(true);
            setTimerActive(false);
          } else {
            setStopWatch((prevTime) => {
              return prevTime + 1;
            });
          }
        }, 1000);
      } else if (!timerActive && stopWatchRef.current !== 0) {
        clearInterval(interval);
      }
    }
    return () => clearInterval(interval); // Cleanup on unmount
  }, [timerActive]);

  //set the timer to a new value
  const changeCount = (newCount) => {
    setTimerActive(false);
    setStopWatch(0);
    setTarget(newCount);
    setTime(newCount);
    setTimer(newCount);
    setResetKey((prevKey) => !prevKey); // resets the word prompt component
  };

  //resets game
  const reset = () => {
    setTimerActive(false);
    setTimer(time);
    setStopWatch(0);
    setResetKey((prevKey) => !prevKey); // resets the word prompt component
    setShowResults(false);
  };

  return (
    <div className="background bg-gradient fullHeight">
      <NavBar />
      <Mode
        handleCount={changeCount}
        timer={timer}
        reset={reset}
        setMode={setMode}
        mode={mode}
        target={target}
        correctWords={correctWords}
      />
      <WordPrompt
        key={resetKey}
        timerActive={timerActive}
        setTimerActive={setTimerActive}
        time={time}
        showResults={showResults}
        setCorrectWords={setCorrectWords}
        stopWatch={stopWatch}
        mode={mode}
      />
      <ProgressBar />
    </div>
  );
}

export default App;
