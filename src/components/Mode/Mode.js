import React from "react";
import "./Mode.css";
function Mode(props) {
  // const [mode, setMode] = useState("timer");
  const {handleTime, reset} = props;
  return (
    <div className="container text-center mode py-4">
      <div className="row align-items-center">
        <div className="col">
          <button
            className="remove-button-default"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-stopwatch col"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button onClick={()=>handleTime(15)} className="dropdown-item">
                15
              </button>
            </li>
            <li>
              <button onClick={()=>handleTime(30)} className="dropdown-item">
                30
              </button>
            </li>
            <li>
              <button onClick={()=>handleTime(60)} className="dropdown-item">
                60
              </button>
            </li>
          </ul>
        </div>
        <span className="col">{props.timer}</span>
        <button className='remove-button-default col' onClick={reset}><i className="bi bi-arrow-clockwise"></i></button>
      </div>
    </div>
  );
}

export default Mode;
