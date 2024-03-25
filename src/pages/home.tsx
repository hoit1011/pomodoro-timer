import React, { useState, useEffect, useRef } from 'react';

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
    let interval: number

    if (isStarted) {
      interval = setInterval(() => {
        setAngle((prevAngle) => prevAngle - 0.01)
      }, 100)
      interval = setInterval(() => {
        setMinute((prevMinute) => prevMinute - 1)
      },60000)
    }

    return () => {
      clearInterval(interval)
    };
  }, [isStarted])

  const handleStartBtnClick = () => {
    setIsStarted(true)
  };

  return (
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
  );
};

export default ClockHand;
