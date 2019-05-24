import React, { useState, useEffect } from 'react';
import DocumentTitle from "react-document-title";
import soundOnClick from "./decay.mp3";
import soundOnEnd from "./smtb.mp3";

function RelaxTime({ isWorkStarted, setIsWorkStarted, setIsRelaxingTime }) {
  const [minutes, setMinutes] = useState(10);
  const [ seconds, setSeconds ] = useState(0);
  let timerId;

  
  useEffect(() => {
    isWorkStarted === false ? timerId = setInterval(() => tick(), 1000) : timerId;
    return function cleanUp() {
      clearInterval(timerId);
    }
  });

  const tick = () => {
    if(minutes === 0 && seconds === 0) {
      new Audio(soundOnEnd).play();
      setIsWorkStarted(true);
      setIsRelaxingTime(false);
      return;
    } else if(seconds === 0) {
      setMinutes(minutes-1);
      setSeconds(59);
    } else {
      setSeconds(seconds-1);
    }
  };
    
  return (
  <DocumentTitle title={(minutes < 10 ? `0${minutes}` : minutes) + " : " + (seconds < 10 ? `0${seconds}` : seconds)}>
    <React.Fragment>
      <div className="title">Отдохните</div>
      <div className="countdown_timer relax_timer">
        <span className="counter">{minutes < 10 ? `0${minutes}` : minutes}</span>
        {" : "}
        <span className="counter">{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
    </React.Fragment>
  </DocumentTitle>
  );
}
 
export default RelaxTime;