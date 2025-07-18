import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const arrayLength = anecdotes.length;
  const getRandomNumber = () => Math.floor(Math.random() * arrayLength);
  const [selected, setSelected] = useState(getRandomNumber());
  const [votes, setVotes] = useState(new Array(arrayLength).fill(0));

  const maxVote = Math.max(...votes);
  const maxIndex = votes.indexOf(maxVote);

  const handleVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <h1>Random Anecdotes</h1>
      <p>"{anecdotes[selected]}"</p>
      <button onClick={() => setSelected(getRandomNumber())}>
        Random Anecdote
      </button>

      <button onClick={handleVotes}>Vote anecdote num: {selected + 1}</button>
      <p>Votes: {votes[selected]}</p>
      {/* {maxVote > 0 && (
        <>
          <h2>Most voted with {maxVote} Votes: </h2>
          <p>"{anecdotes[maxIndex]}"</p>
        </>
      )} */}

      {maxVote > 0 ? (
        <>
          <h2>Most voted with {maxVote} Votes: </h2>
          <p>"{anecdotes[maxIndex]}"</p>
        </>
      ) : (
        <h2>No hay votos</h2>
      )}
    </div>
  );
};

export default App;
