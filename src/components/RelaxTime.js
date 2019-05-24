import React from 'react';

function RelaxTime({ setIsRelaxingTime }) {
  const [minutes, setMinutes] = useState(10);
  const [ seconds, setSeconds ] = useState(0);
  const [isStarted, setIsStarted] = useState(true);
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
      setIsRelaxingTime(false);
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
    
  return (
  <DocumentTitle title={(minutes < 10 ? `0${minutes}` : minutes) + " : " + (seconds < 10 ? `0${seconds}` : seconds)}>
    <div className="countdown_timer">
      <span className="counter">{minutes < 10 ? `0${minutes}` : minutes}</span>
      {" : "}
      <span className="counter">{seconds < 10 ? `0${seconds}` : seconds}</span>
    </div>
  </DocumentTitle>
  );
}
 
export default RelaxTime;