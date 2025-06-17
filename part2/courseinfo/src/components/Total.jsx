import React from "react";

const Total = ({ parts }) => {
  //funcion reduce para sumar la cantidad de excersices (int) de parts (parts.excersices)
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p>
      <b>Total Number of exercises: {total}</b>
    </p>
  );
};

export default Total;
