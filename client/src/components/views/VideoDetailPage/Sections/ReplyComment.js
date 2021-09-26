import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props){

    const commentList = props.commentList;
    const [ ChildCommentNumber, setChildCommentNumber ] = useState(0);
    const [ OpenReplyComment, setOpenReplyComment ] = useState(false);

    useEffect(()=>{

        let commentNum = 0;
        commentList.map((comment, index) => {
            if(comment.responseTo === props.parentCommentId){
                commentNum++;
            }
        })
        setChildCommentNumber(commentNum);

    },[props.commentList, props.parentCommentId]);

    const renderReplyComment = (parentCommentId) => {
        return commentList.map((comment, index) => (
            <React.Fragment key={index}>
            {   
            comment.responseTo === parentCommentId &&
            <div style={{width : '80%', marginLeft : '40px'}}>
                <SingleComment postId={props.postId} comment={comment} refreshFunc={props.refreshFunc} />
                <ReplyComment commentList={commentList} parentCommentId={comment._id} postId={props.postId} refreshFunc={props.refreshFunc} />
            </div>
                
            }
            </React.Fragment>
        ))
    }
    const handleChange = () => {
        setOpenReplyComment(!OpenReplyComment);
    }

    return(
        <div>
            {ChildCommentNumber > 0 && 
            <p style={{fontSize:'14px', margin:0, color:'gray'}} onClick={handleChange}>
                View {ChildCommentNumber} more comment(s)
            </p>}
            {OpenReplyComment &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}
export default React.memo(ReplyComment);