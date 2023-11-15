import React, { useState } from "react";
import { updateLeaderboards } from "../../api/api";

function Results(props) {
  const { typedWords, time, mode, stopWatch } = props;
  const [name, setName] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  let typingSpeed;
  if (mode === "time") {
    typingSpeed = (typedWords.length / time * 60).toFixed(2);
  } else if (mode === "words") {
    typingSpeed = (typedWords.length / stopWatch * 60).toFixed(2);
  } else {
    typingSpeed = "Error Mode not found";
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await updateLeaderboards({
        name: name,
        wpm: typingSpeed,
        mode: mode
      })
      if (response.status === 200) {
        setIsSubmitted(true)
      } else {
        alert("Sorry! Leaderboard update unsuccessful")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container mt-5 results">
      <div className="card text-bg-dark mb-3">
        <div className="card-header">
          Results
        </div>
        <div className="card-body">
          <h5 className="card-title">Typing Speed</h5>
          <p className="card-text">{typingSpeed} words per minute</p>
        </div>
        <div className="card-body">
          <h5 className="card-title">Time Taken</h5>
          <p className="card-text">{mode === "time" ? time : stopWatch} s</p>
        </div>
      </div>

      {isSubmitted ? (<div class="alert alert-success" role="alert">
        Your record has been successfully added to the leaderboard!
      </div>) :
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label htmlFor="name" class="form-label">Name</label>
            <div className="col-sm-4">
              <input type="text" class="form-control" id="name" onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <button type="submit" class="btn btn-secondary">Add to leaderboard</button>
        </form>
      }
    </div>
  );
}

export default Results;
