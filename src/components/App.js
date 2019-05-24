import React, { useState, useEffect, useRef } from 'react';
import DocumentTitle from "react-document-title";
import soundOnClick from "./decay.mp3";
import soundOnEnd from "./smtb.mp3";
import RelaxTime from './RelaxTime';

function App() {
  const [minutes, setMinutes] = useState(1);
  const [ seconds, setSeconds ] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isRelaxingTime, setIsRelaxingTime] = useState(false);
  
  let timerId;

  
  useEffect(() => {
    isStarted ? timerId = setInterval(() => tick(), 1000) : timerId;
    return function cleanUp() {
      clearInterval(timerId);
    }
  });

  const tick = () => {
    if(minutes === 0 && seconds === 0) {
      new Audio(soundOnEnd).play();
      setIsStarted(false);
      setIsRelaxingTime(true);
      return;
    } else if(seconds === 0) {
      setMinutes(minutes-1);
      setSeconds(59);
    } else {
      setSeconds(seconds-1);
    }
  };

  const handleStart = () => {
    if(minutes === 0) {
      setMinutes(20);
    }
    new Audio(soundOnClick).play();
    setIsStarted(true);
  };

  const handleStop = () => {
    setIsStarted(false);
  }
    
  return (
  <DocumentTitle title={(minutes < 10 ? `0${minutes}` : minutes) + " : " + (seconds < 10 ? `0${seconds}` : seconds)}>
    <div className="pomodoro-app">
      {isRelaxingTime ?
        <RelaxTime setIsRelaxingTime={setIsRelaxingTime} /> :
        (<div className="countdown_timer">
          <span className="counter">{minutes < 10 ? `0${minutes}` : minutes}</span>
          {" : "}
          <span className="counter">{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>)}
      {isStarted ?
        <button className="btn btn-primary butn" onClick={handleStop}>Pause</button> : 
        <button className="btn btn-primary butn" onClick={handleStart}>Play</button>}
      
    </div>
  </DocumentTitle>
  );
}
 
export default App;