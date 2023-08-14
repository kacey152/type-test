import React, { useReducer,} from "react";
import { generate } from "random-words";
import "./WordPrompt.css";

const initial = {
  wordArray: generate(40),
  typedWords: [],
  typedLetters: "",
};

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
  const [state, dispatch] = useReducer(reducer, initial);
  const {timerActive, timer, setTimerActive, time} = props;

  const handleInput = (e) => {
    if (!timerActive && timer === time) {
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


  return (
    <div className="container">
      <div className="row">
        <label htmlFor="textInput"></label>
        <input
          id="textInput"
          className="textinput"
          type="text"
          onChange={handleInput}
        ></input>
        <p className="wordsDisplay">
          {renderFirstWord()}
          {renderExtra()} {state.wordArray.slice(1).join(" ")}
        </p>
      </div>
    </div>
  );
}

export default WordPrompt;
