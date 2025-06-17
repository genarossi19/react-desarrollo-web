import React from "react";

const Total = ({ parts }) => {
  const [part1, part2, part3] = parts;
  return (
    <p>
      <b>
        Number of exercises{" "}
        {part1.exercises + part2.exercises + part3.exercises}
      </b>
    </p>
  );
};

export default Total;
