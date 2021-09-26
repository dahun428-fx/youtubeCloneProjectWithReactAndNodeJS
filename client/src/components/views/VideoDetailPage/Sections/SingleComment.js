import React, { useEffect, useState } from 'react';
import { Avatar, Comment } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { saveComment } from '../../../../_actions/comment_action';
import LikeDisLike from './LikeDisLike';

function SingleComment(props){

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const [ SingleCommentValue, setSingleCommentValue ] = useState("");
    const [ OpenReply, setOpenReply ] = useState(false);

    const onChangeTextarea = (event) => {
        setSingleCommentValue(event.currentTarget.value);
    }
    const onClickReplyHanlder = () => {
        setOpenReply(!OpenReply);
    }
    const actions = [
        <LikeDisLike comment commentId={props.comment._id} userId={localStorage.getItem("userId")}/>,
        <span onClick={onClickReplyHanlder} key="comment-basic-reply-to">Reply to</span>
    ]

    const onSubmit = (event) => {
        event.preventDefault();
        
        let body = {
            content : SingleCommentValue,
            writer : user.userData._id,
            postId : props.postId,
            responseTo : props.comment._id
        }
        dispatch(saveComment(body)).then(res => {
            if(res.payload.success){
                setSingleCommentValue("");
                props.refreshFunc(res.payload.result);
            }
        })
    }
    return(
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image } alt="avatar" />}
                content={<p>{props.comment.content}</p>}
            /> 
            {OpenReply &&
            <form  
                style={{display:'flex'}}
                onSubmit={onSubmit}
            >
                <textarea
                    style={{width : '100%', borderRadius : '5px'}}
                    onChange={onChangeTextarea}
                    value={SingleCommentValue}
                    placeholder="코멘트를 작성해주세요."
                />
                <br />
                <button
                    style={{width : '20%', height : '52px'}}
                    onClick={onSubmit}
                >Submit</button>
            </form>}
        </div>
    )
}
export default React.memo(SingleComment);