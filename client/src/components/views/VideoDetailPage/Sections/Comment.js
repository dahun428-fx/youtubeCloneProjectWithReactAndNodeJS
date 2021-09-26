import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveComment } from '../../../../_actions/comment_action';
import ReplyComment from './ReplyComment';
import SingleComment from './SingleComment';

function Comment(props){

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [ CommentValue, setCommentValue ] = useState("");
    const CommentList = props.commentList;

    const onChangeTextarea = (event) => {
        setCommentValue(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        let body = {
            content : CommentValue,
            writer : user.userData._id,
            postId : props.postId,
        }
        dispatch(saveComment(body)).then(res => {
            if(res.payload.success){
                setCommentValue("");
                props.refreshFunc(res.payload.result);
            }
        })
    }
    return(
        <div>
            <br />
            <p>Replies</p>
            <hr />
            {/* Comment List */}
            {CommentList && CommentList.map((comment, index) => (
                (!comment.responseTo &&
                <React.Fragment key={`${index}`}>
                    <SingleComment postId={props.postId} comment={comment} refreshFunc={props.refreshFunc} />
                    <ReplyComment postId={props.postId} parentCommentId={comment._id} commentList={CommentList} refreshFunc={props.refreshFunc} />
                </React.Fragment>
                )
            ))}

            {/* Root Comment Form */}
            <form 
                style={{display: 'flex'}}
                onSubmit={onSubmitHandler}
            >
                <textarea 
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={onChangeTextarea}
                    value={CommentValue}
                    placeholder="코멘트를 작성해주세요."
                />
                <br />
                <button
                    style={{width:'20%', height:'52px'}}
                    onClick={onSubmitHandler}
                >Submit</button>
            </form>
        </div>
    );
}

export default Comment;