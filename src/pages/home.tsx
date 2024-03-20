import React, { useState, useEffect, useRef } from 'react';

const ClockHand: React.FC = () => {
  const [angle, setAngle] = useState<number>(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const clockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        const newAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI)
        setAngle(newAngle + 90)
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
  }, [isDragging])

  return (
    <div className="clock" ref={clockRef}>
      <div
        className="stick"
        style={{ 
          transform: `rotate(${angle}deg)`,
        }}
      ></div>
      <div className="fill" style={{ 
          background: `conic-gradient(red ${angle}deg, transparent 0deg)`,
        }}></div>
      <div>{angle}</div>
    </div>
  );
};

export default ClockHand;
