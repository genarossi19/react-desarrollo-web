import "./App.css";
import { useState } from "react";
import Statistics from "./components/Statistics";

function App() {
  // const [good, setGood] = useState(0);
  // const [neutral, setNeutral] = useState(0);
  // const [bad, setBad] = useState(0);

  const [votes, setVotes] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  return (
    <>
      <h1>Unicafe</h1>
      <h2>Dame feedback</h2>
      <div className="">
        <button
          onClick={() => {
            setVotes({ ...votes, good: votes.good + 1 });
          }}
        >
          good
        </button>
        <button
          onClick={() => {
            setVotes({ ...votes, neutral: votes.neutral + 1 });
          }}
        >
          neutral
        </button>
        <button
          onClick={() => {
            setVotes({ ...votes, bad: votes.bad + 1 });
          }}
        >
          bad
        </button>
        <Statistics votes={votes} />
      </div>
    </>
  );
}

export default App;
