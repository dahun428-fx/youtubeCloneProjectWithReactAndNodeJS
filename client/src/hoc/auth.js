import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function authHoc(SpecificComponent, option, adminRoute = null){
 
    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        
        let user = useSelector(state => state.user);
        
        useEffect(()=>{
            dispatch(auth()).then(async res => {
                if(await !res.payload.isAuth){
                    if(option){
                        props.history.push('/login');
                    }
                } else {
                    if( adminRoute && !res.payload.isAuth ){
                        props.history.push('/');
                    } else {
                        if( option === false ){
                            props.history.push("/");
                        }
                    }
                }
            })
        },[dispatch, props.history]);
        
        return(
            <SpecificComponent {...props} user={user} />
        );
    }

    return AuthenticationCheck;
}