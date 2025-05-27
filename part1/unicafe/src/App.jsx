import "./App.css";
import { useState } from "react";
function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const getAll = () => good + neutral + bad;
  const getAverage = () => (getAll() === 0 ? 0 : (good - bad) / getAll());
  const getGoodAverage = () => (getAll() === 0 ? 0 : (good * 100) / getAll());

  return (
    <>
      <h1>Unicafe</h1>
      <h2>Dame feedback</h2>
      <div className="">
        <button
          onClick={() => {
            setGood(good + 1);
          }}
        >
          good
        </button>
        <button
          onClick={() => {
            setNeutral(neutral + 1);
          }}
        >
          neutral
        </button>
        <button
          onClick={() => {
            setBad(bad + 1);
          }}
        >
          bad
        </button>
      </div>
      <h2>Estadisticas</h2>
      <p>✅ Bueno: {good}</p>
      <p> ➖ Neutral: {neutral}</p>
      <p>❌ Bad: {bad}</p>
      <h2>Total: {getAll()}</h2>
      <h2>Promedio: {getAverage() * 100}%</h2>
      <h2>Positivos: {getGoodAverage()}%</h2>
    </>
  );
}

export default App;
