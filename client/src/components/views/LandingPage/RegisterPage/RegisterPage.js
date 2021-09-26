import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../../_actions/user_action';

function RegisterPage(props){
 
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }   
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if( Password !== ConfirmPassword ){
            return alert('비밀번호를 확인해주세요');
        }
        let body = {
            email : Email,
            name : Name,
            password : Password,
        }
        dispatch(registerUser(body)).then(res => {
            if( res.payload.success ){
                props.history.push("/");
            } else {
                alert('이미 존재하는 회원입니다.');
            }
        })
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
            <label>Name</label>
            <input type="text" value={Name} onChange={onNameHandler}/>
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler}/>
            <label>ConfirmPassword</label>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
            <br/>
            <button type="submit">Regist</button>
        </form>
    </div>
    )
}


export default RegisterPage;