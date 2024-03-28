import React, { useState, useEffect, useRef } from 'react';
import "../pages/home.css"

const ClockHand: React.FC = () => {
  const [angle, setAngle] = useState<number>(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [minute, setMinute] = useState<number>(0)
  const clockRef = useRef<HTMLDivElement>(null)
  const [isStarted, setIsStarted] = useState<boolean>(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && !isStarted) { 
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        const newAngle = ((Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI)) + 90) % 360
        const minuteAngle = Math.ceil(newAngle / 6)
        setMinute(minuteAngle <= 0 ? minuteAngle + 60 : minuteAngle)
        setAngle(newAngle < 0 ? newAngle + 360 : newAngle)
      }
    }

    const startDragging = () => setIsDragging(true)
    const stopDragging = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', startDragging)
    window.addEventListener('mouseup', stopDragging)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', startDragging)
      window.removeEventListener('mouseup', stopDragging)
    }
  }, [isDragging, isStarted])

  useEffect(() => {
    let angleInterval: number;
    let minuteInterval: number;
  
    if (isStarted) {
      angleInterval = setInterval(() => {
        setAngle((prevAngle) => {
          const newAngle = prevAngle - 0.01;
          if (newAngle <= 0) {
            clearInterval(angleInterval); 
            setIsStarted(false);
            setMinute(0);
            return 0;
          }
          return newAngle;
        });
      }, 100);
  
      minuteInterval = setInterval(() => {
        setMinute((prevMinute) => prevMinute - 1);
      }, 60000);
    }
  
    return () => {
      clearInterval(angleInterval);
      clearInterval(minuteInterval);
    };
  }, [isStarted]);
  

  const handleStartBtnClick = () => {
    setIsStarted(true)
  };

  return (
    <div>
      <div className='Signup'>혹시 아직 회원가입을 안하셨다면 ..?
        <span className='Signup'>회원가입</span>
      </div>
      <div className="clock" ref={clockRef}>
        <div
          className="stick"
          style={{
            transform: `rotate(${angle}deg)`,
          }}
        ></div>
        <div
          className="fill"
          style={{
            background: `conic-gradient(${isStarted ? 'blue' : 'red'} ${angle}deg, transparent 0deg)`,
          }}
        ></div>
        <button className="startBtn" onClick={handleStartBtnClick}>
          시작!
        </button>
        <div className="time">{minute}</div>
        <div className='time' style={{ left:500}}> {angle}</div>
      </div>
    </div>
  );
};

export default ClockHand;
