import React from "react";

const Statistics = ({ votes }) => {
  const { good, neutral, bad } = votes;
  const getAll = () => good + neutral + bad;
  const getAverage = () => (getAll() === 0 ? 0 : (good - bad) / getAll());
  const getGoodAverage = () => (getAll() === 0 ? 0 : (good * 100) / getAll());

  return getAll() === 0 ? (
    <h1>No hay feedback</h1>
  ) : (
    <div>
      <h1>Estadisticas</h1>

      {}
      <p>✅ Bueno: {good}</p>
      <p> ➖ Neutral: {neutral}</p>
      <p>❌ Bad: {bad}</p>
      <h2>Total: {getAll()}</h2>
      <h2>Promedio: {getAverage() * 100}%</h2>
      <h2>Positivos: {getGoodAverage()}%</h2>
    </div>
  );
};

export default Statistics;
