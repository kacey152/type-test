import React from "react";
import "./Mode.css";
function Mode(props) {
  const { handleCount, reset, setMode, mode, correctWords, timer, target } = props;
  return (
    <div className="container text-center mode py-4">
      <div className="row align-items-center">
        <div className="col">
          {/* Change mode  */}
          <button
            className="remove-button-default"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {mode === "time" ? (
              <i className="bi bi-stopwatch col"></i>
            ) : mode === "words" ? (
              <i class="bi bi-fonts"></i>
            ) : null}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button onClick={() => setMode("time")} className="dropdown-item">
                Time
              </button>
            </li>
            <li>
              <button
                onClick={() => setMode("words")}
                className="dropdown-item"
              >
                Words
              </button>
            </li>
          </ul>
        </div>
        {/* Change Timer/Words */}
        <div className="col">
          <button
            className="remove-button-default"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {mode === "time" ? (
              <span>{timer}</span>
            ) : mode === "words" ? (
              <span>{target-correctWords}</span>
            ) : null}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button onClick={() => handleCount(15)} className="dropdown-item">
                15
              </button>
            </li>
            <li>
              <button onClick={() => handleCount(30)} className="dropdown-item">
                30
              </button>
            </li>
            <li>
              <button onClick={() => handleCount(60)} className="dropdown-item">
                60
              </button>
            </li>
          </ul>
        </div>
        <button className="remove-button-default col" onClick={reset}>
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </div>
  );
}

export default Mode;
