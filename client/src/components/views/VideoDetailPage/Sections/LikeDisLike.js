import React, { useEffect, useState } from 'react';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useDispatch} from 'react-redux';
import { downDisLike, downLike, getDisLikes, getDisLikesByUser, getLikes, getLikesByUser, upDisLike, upLike } from '../../../../_actions/like_action';

function LikeDisLike(props){
    
    const [ LikeNumber, setLikeNumber ] = useState(0);
    const [ DisLikeNumber, setDisLikeNumber ] = useState(0);
    const [ LikeAction, setLikeAction ] = useState(false);
    const [ DisLikeAction, setDisLikeAction ] = useState(false);

    const dispatch = useDispatch();

    
    let body = {};
    if(props.video){
        body = {
            videoId : props.videoId,
            userId : props.userId
        }
    } else {
        body = {
            commentId : props.commentId,
            userId : props.userId
        }
    }
    useEffect(()=>{
        dispatch(getLikes(body)).then(res => {
            if(res.payload.success) {
                setLikeNumber(res.payload.likes.length);
            } 
        })
        dispatch(getLikesByUser(body)).then(res => {
            if(res.payload.success && res.payload.likes){
                setLikeAction(true);
            }
        })
        dispatch(getDisLikesByUser(body)).then(res => {
            if(res.payload.success && res.payload.dislikes){
                setDisLikeAction(true);
            }
        })
        dispatch(getDisLikes(body)).then(res => {
            if(res.payload.success) {
                setDisLikeNumber(res.payload.dislikes.length);
            }
        })
    },[]);

    const onClickLikeHandler = () => {
        if(LikeAction){
            dispatch(downLike(body)).then(res => {
                if(res.payload.success){
                    setLikeAction(!LikeAction);
                    setLikeNumber(LikeNumber - 1);
                } 
            })

        } else {
            dispatch(upLike(body)).then(res => {
                if(res.payload.success){
                    setLikeAction(!LikeAction);
                    setLikeNumber(LikeNumber + 1);
                    if(DisLikeAction){
                        setDisLikeAction(!DisLikeAction);
                        setDisLikeNumber(DisLikeNumber - 1);
                    }
                }
            })
        }
    }
    const onClickDisLikeHandler = () => {
        if(DisLikeAction){
            dispatch(downDisLike(body)).then(res=>{
                if(res.payload.success){
                    setDisLikeAction(!DisLikeAction);
                    setDisLikeNumber(DisLikeNumber - 1);
                }
            })
        } else {
            dispatch(upDisLike(body)).then(res=> {
                if(res.payload.success){
                    setDisLikeAction(!DisLikeAction);
                    setDisLikeNumber(DisLikeNumber + 1);
                    if(LikeAction){
                        setLikeAction(!LikeAction);
                        setLikeNumber(LikeNumber - 1);
                    }
                }
            })
        }
    }

    return(
        <div>
            <span key="comment-basic-like">
                <Tooltip
                    title="Like"
                >
                    {LikeAction ? 
                        <LikeFilled onClick={onClickLikeHandler}/> :
                        <LikeOutlined onClick={onClickLikeHandler} />
                    }

                </Tooltip>
                <span style={{paddingLeft:'8px', cursor:'auto'}}>{LikeNumber}</span>
            </span>
            <span key="comment-basic-dislike" style={{paddingLeft:'12px', paddingRight:'12px'}}>
                <Tooltip
                    title="DisLike"
                >
                    {DisLikeAction ?
                        <DislikeFilled onClick={onClickDisLikeHandler} /> :
                        <DislikeOutlined onClick={onClickDisLikeHandler} />
                    }
                </Tooltip>
                <span style={{paddingLeft:'8px', cursor:'auto'}}>{DisLikeNumber}</span>
            </span>
            
        </div>
    )
}
export default LikeDisLike;