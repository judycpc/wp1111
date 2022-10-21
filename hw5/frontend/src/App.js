// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { guess, startGame, restart } from './axios';


function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

  const handleGuess = async () => {
    const response = await guess(number);

    if (response === 'Equal') setHasWon(true)
    else {
      setStatus(response)
      setNumber('')
    }
  };

  const handleRestart = async () => {
    const response = await restart();
    setHasWon(false);
    setNumber('');
    setStatus('');
  }

  const startMenu = (
    <div>
      <button onClick={async () => {
        await startGame();
        setHasStarted(true);
      }}> start game </button>
    </div>
  );

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input onChange={(e) => setNumber(e.target.value)}  // Get the value from input
      ></input>
      <button  // Send number to backend
        onClick={handleGuess}
        disabled={!number} >guess!</button>
      <p>{status}</p>
    </>
  );

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button onClick={handleRestart}  // Handle restart for backend and frontend
      >restart</button>
    </>
  );

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  );

  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
