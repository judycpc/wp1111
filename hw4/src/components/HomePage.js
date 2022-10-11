/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  const [inputMineNum, setInputMineNum] = useState(10);
  const [inputBoardSize, setInputBoardSize] = useState(8);
  const [controlNumStyle, setControlNumStyle] = useState({color: "#0f0f4b"})
  const [errorStyle, setErrorStyle] = useState({color: "transparent"})
  const [startStyle, setStartStyle] = useState({cursor: "pointer"})

  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */}
  
  const handleShowPanel = () => {
    if (showPanel) {
      setShowPanel(false);
    } else {
      setShowPanel(true);
    }
  }

  const handleInputMineNum = (newVal) => {
    newVal = parseInt(newVal);
    setInputMineNum(newVal);

    if (newVal > inputBoardSize*inputBoardSize) {
      setError(true);
      setControlNumStyle({color: "#880000"});
      setErrorStyle({color: "#880000"});
      setStartStyle({cursor: "not-allowed"});
    } else {
      setError(false);
      setControlNumStyle({color: "#0f0f4b"});
      setErrorStyle({color: "transparent"});
      setStartStyle({cursor: "pointer"});
      mineNumOnChange(newVal);
    }
  }

  const handleInputBoardSize = (newVal) => {
    newVal = parseInt(newVal);
    setInputBoardSize(newVal);

    if (inputMineNum > newVal*newVal) {
      setError(true);
      setControlNumStyle({color: "#880000"});
      setErrorStyle({color: "#880000"});
      setStartStyle({cursor: "not-allowed"});
    } else {
      setError(false);
      setControlNumStyle({color: "#0f0f4b"});
      setErrorStyle({color: "transparent"});
      setStartStyle({cursor: "pointer"});
      boardSizeOnChange(parseInt(newVal));
    }
  }


  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implemen start button */}
      <button className='btn' style={startStyle} onClick={() => startGameOnClick(error)}>Start Game</button>

      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
      <div className='controlContainer'>
        <button className='btn' onClick={handleShowPanel}>Difficulty Adjustment</button>
        {
          showPanel ?
          <div className='controlWrapper'>
            <div className='error' style={errorStyle}>ERROR: Mines number and board size are invalid!</div>
            <div className='controlCol'>
              <p className='controlTitle'>Mines Number</p>
              <input type='range' step='1' min={1} max={100} defaultValue={mineNum} onChange={(event) => handleInputMineNum(event.target.value)} />
              <p className='controlNum' style={controlNumStyle}>{inputMineNum}</ p>
            </div>
            <div className='controlCol'>
              <p className='controlTitle'>Board Size (n×n)</p>
              <input type='range' step='1' min={3} max={20} defaultValue={boardSize} onChange={(event) => handleInputBoardSize(event.target.value)} />
              <p className='controlNum' style={controlNumStyle}>{inputBoardSize}</ p>
            </div>
          </div>
          : null
        }
      </div>

    </div>
  );

}
export default HomePage;   