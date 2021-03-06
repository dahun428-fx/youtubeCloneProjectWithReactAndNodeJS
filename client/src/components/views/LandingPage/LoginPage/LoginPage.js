import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../../_actions/user_action';

function LoginPage(props){

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const dispatch = useDispatch();

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        let body = {
            email : Email,
            password : Password,
        }
        dispatch(loginUser(body)).then(res => {
            if( res.payload.loginSuccess ){
                window.localStorage.setItem('userId', res.payload.userId);
                props.history.push('/');
            } else {
                alert('로그인에 실패하였습니다.');
            }
        });
    }

    return (
        <div style={{
            display:'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'}}
            onSubmit={onSubmitHandler}
            >
            <form style={{display:'flex', flexDirection:'column'}}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );

}

export default LoginPage;