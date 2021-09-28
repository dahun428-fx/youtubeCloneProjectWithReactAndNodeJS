import React from 'react';
import {Menu} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../../../../_actions/user_action';



function RightMenu(props){
    const user = useSelector(state => state.user)

    const dispatch = useDispatch();
    const logoutHandler = (event) =>{
      event.preventDefault();
       dispatch(logout()).then(res => {
           if( res.payload.success ){
               alert('로그아웃 되었습니다.')
               localStorage.removeItem('userId');
               props.history.push("/login");
           } else {
               alert('이미 로그아웃 처리된 회원입니다.');
           }
       })    
  }

    if ( user.userData && !user.userData.isAuth ) {
        return (
          <Menu mode={props.mode} offset={5}>
            <Menu.Item key="signin">
              <a href="/login">Signin</a>
            </Menu.Item>
            <Menu.Item key="signup">
              <a href="/register">Signup</a>
            </Menu.Item>
          </Menu>
        )

      } else {
        return (
          <Menu mode={props.mode}>
            <Menu.Item key="logout">
              <a href="#javascript" onClick={logoutHandler}>Logout</a>
            </Menu.Item>
          </Menu>
        )
      }
}
export default RightMenu;