import React from "react";
import StatisticsLine from "./StatisticsLine";

const Statistics = ({ votes }) => {
  const { good, neutral, bad } = votes;
  const getAll = () => good + neutral + bad;
  const getAverage = () => (getAll() === 0 ? 0 : (good - bad) / getAll());
  const getGoodAverage = () => (getAll() === 0 ? 0 : (good * 100) / getAll());

  return getAll() === 0 ? (
    <div>
      <h1>No hay feedback</h1>
      <p>Toca alguna opcion para votar para votar</p>
    </div>
  ) : (
    <div>
      <h1>Estadisticas</h1>
      <table>
        <tbody>
          <StatisticsLine text="👍 Bueno" value={good} />
          <StatisticsLine text="😐 Neutral" value={neutral} />
          <StatisticsLine text="👎 Malo" value={bad} />
          <StatisticsLine text="Total" value={getAll()} />
          <StatisticsLine text="Promedio" value={`${getAverage() * 100}%`} />
          <StatisticsLine text="Positivos" value={`${getGoodAverage()}%`} />
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
