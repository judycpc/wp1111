/****************************************************************************
  FileName      [ Dashnoard.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Dashboard. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import "./css/Dashboard.css"
let timeIntervalId;

export default function Dashboard({ remainFlagNum, gameOver, win }) {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);

  let [timeStr, setTimeStr] = useState("00:00");

  // Advanced TODO: Implement the timer on the Dashboard
  {/* Useful Hint: Try to understand the difference between time and sTime. */ }

  useEffect(() => {
    if (!gameOver && !win) {
      timeIntervalId = setInterval(() => {
        setTime(time => time + 1);
      }, 1000)
    } else {
      setSTime(timeStr);
      setTime(0);
    }

    return () => clearInterval(timeIntervalId);
  }, [gameOver, win]);

  useEffect(() => {
    let s = time % 60;
    let m = Math.floor(time/60);

    s = ("0" + s).slice(-2);
    if (String(m).length <= 2) {
      m = ("0" + m).slice(-2);
    } else {
      m = String(m)
    }
    setTimeStr(m+':'+s);
  }, [time]);


  return (
    <div className="dashBoard" >
      <div id='dashBoard_col1' >
        <div className='dashBoard_col'>
          <p className='icon'>🚩</p>
          {remainFlagNum}
        </div>
      </div>
      <div id='dashBoard_col2' >
        <div className='dashBoard_col'>
          <p className='icon'>⏰</p>
          {(gameOver || win) ? sTime : timeStr}
        </div>
      </div>
    </div>
  );
}
