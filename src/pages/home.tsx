import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChartPie } from "react-icons/fa";
import "./home.css"
import axios from 'axios';

const ClockHand: React.FC = () => {
  const [angle, setAngle] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [minute, setMinute] = useState(0)
  const clockRef = useRef(null)
  const [isStarted, setIsStarted] = useState(false)
  const token = localStorage.getItem('token')

  const chartpage = async () => {
    const response = await axios.get('http://localhost:8080/chart', {
      headers: {
        Authorization: token
      }
    })  
    console.log(response)
    if(response.data.status === 200){
      window.location.href = '/chart'
    }else{
      alert('로그인이 필요합니다.')
      window.location.href = '/Signup'
      localStorage.removeItem('token')
    }
  }
 
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
      {token &&(<div className='chart' onClick={chartpage}>
          <FaChartPie/><span style={{padding:20, fontWeight:'bold'}}>차트보러가기</span>
      </div>)}
      {!token &&(<div className='Signup'>혹시 아직 회원가입을 안하셨다면 ..?
        <span className='Signupbtn'>
          <Link to="Signup" style={{textDecoration: 'none', color: 'gray'}}>
            회원가입
          </Link>
        </span>
      </div>)}
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
      </div>
    </div>
  );
};

export default ClockHand;
