import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Mode from "./components/Mode/Mode";
import WordPrompt from "./components/WordPrompt/WordPrompt";
import React, { useState, useEffect, useRef } from "react";
import { ProgressBar } from "./components/ProgressBar/ProgressBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Leaderboards from "./components/Leaderboards/Leaderboards";

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
  const modeRef = useRef(mode);

  // Update refs whenever timer or time change
  useEffect(() => {
    timerRef.current = timer;
    timeRef.current = time;
    stopWatchRef.current = stopWatch;
    correctWordsRef.current = correctWords;
    targetRef.current = target;
    modeRef.current = mode;
  }, [timer, time, stopWatch, correctWords, target, mode]);

  //Function that triggers the clock when first input detected

  useEffect(() => {
    let interval;
    let startTime;
    if (timerActive && modeRef.current === "time") {
      //Timer Logic
      startTime = Date.now();
      interval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const newTimerValue = timeRef.current - elapsedTime;
        if (newTimerValue <= 0) {
          setTimer(0);
          setShowResults(true);
          setTimerActive(false);
          clearInterval(interval);
        } else {
          setTimer(newTimerValue);
        }
      }, 100);

    } else if (timerActive && modeRef.current === "words") {
      //Measure time for fixed number of words
      startTime = Date.now();
      interval = setInterval(() => {
        if (targetRef.current - correctWordsRef.current === 0) {
          const elapsedTime = (Date.now() - startTime) / 1000;
          setStopWatch(elapsedTime);
          setShowResults(true);
          setTimerActive(false);
        }
      }, 100);

    }
    return () => clearInterval(interval); // Cleanup on unmount
  }, [timerActive]);

  const changeMode = (newMode) => {
    reset();
    setMode(newMode);
  };

  //set the timer to a new value
  const changeCount = (newCount) => {
    reset();
    setTarget(newCount);
    setTime(newCount);
    setTimer(newCount);
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

      <BrowserRouter>
        <div>
          <NavBar />
          <Routes>
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/" element={<div>
              <Mode
                handleCount={changeCount}
                timer={timer}
                reset={reset}
                changeMode={changeMode}
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
              {mode === "time" ? (
                <ProgressBar current={time - timer} total={time} />
              ) : mode === "words" ? (
                <ProgressBar current={correctWords} total={target} />
              ) : null}
            </div>}
            />
          </Routes>
        </div>
      </BrowserRouter >
    </div>
  )
}

export default App;
