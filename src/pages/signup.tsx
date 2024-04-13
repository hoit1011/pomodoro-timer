import { Fragment, useState } from 'react'
import axios from 'axios'
import './signup.css'

const Signup = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordcheck, setPasswordcheck] = useState('')
    const [isNotice, setIsNotice] = useState(false)
    const [notice, setNotice] = useState('')
    const token = localStorage.getItem('token')

    const showNotice = () => {
        setIsNotice(true)
        setTimeout(() => {
            setIsNotice(false)
        }, 2000)
    }

    const tokencheck = () => {
        console.log(token)
    }

    const Login = async() => {
        try{
            const response = await axios.post('http://localhost:8080/login', {
                name: username,
                password
            }, {headers: {'Content-Type' : 'application/json'}})
            if(response.data.status == 200){
                console.log('로그인 성공')
                console.log(response.data)
                localStorage.setItem('token', response.data.token)
            }else{
                console.log('로그인 실패')
            }
        }catch(e){
            console.error(e)
        }
    }
    const signup = async () => {
        try {

            if (username.length < 4 || username.length > 10) {
                setNotice('아이디는 4글자 이상 10글자 이하여야 합니다.')
                showNotice()
                return
            }

            if (password.length < 8 || password.length > 12) {
                setNotice('비밀번호는 8글자 이상 12글자 이하여야 합니다.')
                showNotice()
                return
            }

            if (password !== passwordcheck) {
                setNotice('비밀번호가 일치하지 않습니다.')
                showNotice()
                return
            }

            const response = await axios.post('http://localhost:8080/signup', {
                name: username,
                password
            }, { headers: { 'Content-Type': 'application/json' } })

            if (response.data.status === 200) {
                console.log('회원가입 성공!')
                setNotice('회원가입 완료하셨습니다.')
                showNotice()
                setTimeout(() => {
                    window.location.href = ''
                    return
                },3000)
            } else if (response.data.status === 400) {
                console.log('아이디 중복 에러!')
                setNotice('이미 등록된 아이디입니다.')
                showNotice()  
                return
            } else {
                console.error('서버 오류!')
                // 기타 에러 처리
                return
            }

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Fragment>
            <div className='noticeContainer'>
                <div className={isNotice ? 'notice' : 'notNotice'}>{notice}</div>
            </div>

            <div className='gradient_background'>
                <div className='container'>
                    <h1>{!isLogin ? "Login" : "Signup"}</h1>
                    <input type='text' placeholder='Username' className='input' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type='password' placeholder='password' className='input' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {isLogin && (<input type='password' placeholder='passwordcheck' className='input' value={passwordcheck} onChange={(e) => setPasswordcheck(e.target.value)} />)}<br />
                    <input type='button' value={!isLogin ? "로그인" : "회원가입"} className='button' onClick={!isLogin ? Login : signup} />
                    <div style={{ color: 'white', fontWeight: 'bold' }}>{isLogin ? "이미 계정이 있으시다면 ?" : "계정이 없으시다면 ? "}</div>
                    <div className='loginbtn' onClick={() => { setIsLogin(!isLogin) }}>{!isLogin ? "회원가입" : "로그인"}</div>
                    <div onClick={tokencheck}>체크</div>
                </div>
            </div>
        </Fragment>
    );
}

export default Signup;
