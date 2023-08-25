import React, { useReducer, useRef, useEffect } from "react";
import { generate } from "random-words";
import "./WordPrompt.css";
import Results from "../Results/Results";

const reducer = (state, action) => {
  switch (action.type) {
    case "updateTyped":
      return { ...state, typedLetters: action.payload };
    case "correctWord":
      return {
        ...state,
        wordArray: state.wordArray.slice(1),
        typedWords: [...state.typedWords, action.payload],
        typedLetters: "",
      };
    case "skipWord":
      return {
        ...state,
        wordArray: state.wordArray.slice(1),
        typedLetters: "",
      };
    case "addWords":
      return {
        ...state,
        wordArray: [...state.wordArray, ...generate(10)],
      };
    default:
      return state;
  }
};
function WordPrompt(props) {
  const initial = {
    wordArray: generate(40),
    typedWords: [],
    typedLetters: "",
  };

  const [state, dispatch] = useReducer(reducer, initial);
  const {
    timerActive,
    setTimerActive,
    time,
    showResults,
    setCorrectWords,
    mode,
    stopWatch
  } = props;

  useEffect(() => {
    setCorrectWords(state.typedWords.length);
  }, [state.typedWords, setCorrectWords]); //setCorrectWords is placed here solely to silence the dependency warning

  const inputRef = useRef(null);

  const handleInput = (e) => {
    if (!timerActive) {
      // start timer on input
      setTimerActive(true);
    }
    const input = e.target.value;
    dispatch({ type: "updateTyped", payload: input });

    //spacebar entered
    if (input[input.length - 1] === " ") {
      if (input === state.wordArray[0] + " ") {
        dispatch({ type: "correctWord", payload: input.slice(0, -1) });
      } else {
        dispatch({ type: "skipWord" });
      }
      e.target.value = ""; // reset input
      //check if there are not enough words
      if (state.wordArray.length === 35) {
        dispatch({ type: "addWords" });
      }
    }
  };
  const renderFirstWord = () => {
    //renders the letters already typed
    const firstWord = state.wordArray[0];
    return Array.from(firstWord).map((letter, index) => {
      if (index < state.typedLetters.length) {
        return letter === state.typedLetters[index] ? (
          <span className="correct">{letter}</span>
        ) : (
          <span className="wrong">{letter}</span>
        );
      }
      return <span>{letter}</span>;
    });
  };
  const renderExtra = () => {
    //renders any extra letters that exceed the original word length
    const firstWord = state.wordArray[0];
    const extraLetters = state.typedLetters.slice(firstWord.length);
    return <span className="wrong">{extraLetters}</span>;
  };

  const handleTextClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return !showResults ? (
    <div className="container main-text">
      <div
        className="row border border-black p-5"
        id="hiddenInput"
        onClick={handleTextClick}
      >
        <label htmlFor="textInput" className="wordsDisplay">
          {renderFirstWord()}
          {renderExtra()} {state.wordArray.slice(1).join(" ")}
        </label>
        <input
          id="textInput"
          className="textInput"
          type="text"
          ref={inputRef}
          onChange={handleInput}
        ></input>
      </div>
    </div>
  ) : (
    <Results typedWords={state.typedWords} time={time} mode={mode} stopWatch={stopWatch} />
  );
}

export default WordPrompt;
