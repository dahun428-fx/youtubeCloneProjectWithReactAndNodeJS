import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { subscribe, subscribed, subscribeNumber, unSubscribe } from '../../../../_actions/subscriber_actions';

function Subscribe(props){

    const dispatch = useDispatch();
    const [ SubscribeNumber, setSubscribeNumber ] = useState(0); 
    const [ Subscribed, setSubscribed ] = useState(false);

    useEffect(()=>{

        let body = {
            userTo : props.userTo
        }   
        dispatch(subscribeNumber(body)).then(res => {
            if(res.payload.success){
                setSubscribeNumber(res.payload.subscribeNumber);
            }
        })
        let body2 = {
            userTo : props.userTo,
            userFrom : props.userFrom
        }
        dispatch(subscribed(body2)).then(res => {
            if( res.payload.success ){
                setSubscribed(res.payload.subscribe);
            }
        })
    },[])
    const onClickHandler = () => {
        let body = {
            userTo : props.userTo,
            userFrom : props.userFrom
        }
        if(!body.userFrom){
            message.error('로그인이 필요합니다.');
            return;
        }
        if( Subscribed ) {
            dispatch(unSubscribe(body)).then(res => {
                if(res.payload.success) {
                    message.info('구독 해제 되었습니다.');
                    setSubscribeNumber(SubscribeNumber - 1);
                    setSubscribed(!Subscribed);
                } else {
                    alert('구독 해제를 실패하였습니다.');
                }
            })
        } else {
            dispatch(subscribe(body)).then(res => {
                if(res.payload.success){
                    message.info('구독 되었습니다.');
                    setSubscribeNumber(SubscribeNumber + 1);
                    setSubscribed(!Subscribed);
                } else {
                    alert('구독에 실패하였습니다.');
                }
            })
        }
    }
    return (
        <button
        style={{backgroundColor:`${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius : '4px', color:'white', padding:'10px 16px', 
        fontWeight: '500', fontSize:'1rem', textTransform:'uppercase'}}
        onClick={onClickHandler}
        ><span style={{marginRight:'0.5rem'}}>{SubscribeNumber}</span>{ Subscribed ? 'Subscribed' : 'Subscribe'}</button>
    );
}
export default Subscribe;