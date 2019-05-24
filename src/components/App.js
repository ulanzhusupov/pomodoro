import React, { useState, useEffect, useRef } from 'react';
import DocumentTitle from "react-document-title";
import soundOnClick from "./decay.mp3";
import soundOnEnd from "./smtb.mp3";
import RelaxTime from './RelaxTime';

function App() {
  const [minutes, setMinutes] = useState(1);
  const [ seconds, setSeconds ] = useState(0);
  const [isWorkStarted, setIsWorkStarted] = useState(false);
  const [isRelaxingTime, setIsRelaxingTime] = useState(false);
  
  let timerId;

  
  useEffect(() => {
    isWorkStarted ? timerId = setInterval(() => tick(), 1000) : timerId;
    return function cleanUp() {
      clearInterval(timerId);
    }
  });

  const tick = () => {
    if(minutes === 0 && seconds === 0) {
      new Audio(soundOnEnd).play();
      setIsWorkStarted(false);
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
    setIsWorkStarted(true);
  };

  const handleStop = () => {
    setIsWorkStarted(false);
  }
    
  return (
  <DocumentTitle title={(minutes < 10 ? `0${minutes}` : minutes) + " : " + (seconds < 10 ? `0${seconds}` : seconds)}>
    <div className="pomodoro-app">
      
      {isRelaxingTime ?
        <RelaxTime isWorkStarted={isWorkStarted} setIsWorkStarted={setIsWorkStarted} setIsRelaxingTime={setIsRelaxingTime} /> :
          (<div className="countdown_timer">
            <span className="counter">{minutes < 10 ? `0${minutes}` : minutes}</span>
            {" : "}
            <span className="counter">{seconds < 10 ? `0${seconds}` : seconds}</span>
          </div>)}
      {isWorkStarted ?
        <button className="btn btn-primary butn" onClick={handleStop}>Pause</button> : 
        <button className="btn btn-primary butn" onClick={handleStart}>Play</button>}
      
    </div>
  </DocumentTitle>
  );
}
 
export default App;