import React, { useState } from 'react';
import './signup.css';

const Signup = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className='gradient_background'>
            <div className='container'>
                <h1>{!isLogin ? "Login" : "Signup"}</h1>
                <input type='text' placeholder='Username' className='input'/>
                <input type='password' placeholder='password' className='input'/>
                {isLogin && (<input type='password' placeholder='passwordcheck' className='input'/>)}<br/>
                <input type='button' value={!isLogin ? "로그인" : "회원가입"} className='button'/>
                <div style={{color:'white', fontWeight:'bold'}}>{isLogin ? "이미 계정이 있으시다면 ?" : "계정이 없으시다면 ? "}</div>
                <div className='loginbtn' onClick={() => {setIsLogin(!isLogin)}}>{!isLogin ? "회원가입" : "로그인"}</div>
            </div>
        </div>
    );
}

export default Signup;
