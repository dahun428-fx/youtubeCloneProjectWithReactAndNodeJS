import React, { useEffect, useState } from 'react';
import { Col, Row, List, Avatar, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVideo, getVideo } from '../../../_actions/video_action';
import { serverURL } from '../../Config/Config';  
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import { getComments } from '../../../_actions/comment_action';
import LikeDisLike from './Sections/LikeDisLike';
import { InfoCircleFilled } from '@ant-design/icons';

function VideoDetailPage(props){

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const [ Video, setVideo ] = useState("");
    const [ CommentList, setCommentList ] = useState([]);

    const videoId = props.match.params.videoId
    const body = {
        videoId
    }
    useEffect(()=>{
        dispatch(getVideo(body)).then(res => {
            if(res.payload.success){
                setVideo(res.payload.video);
            } else {
                alert('비디오 정보를 불러올 수 없습니다.');
            }
        })
        dispatch(getComments(body)).then(res => {
            if(res.payload.success){
                setCommentList(res.payload.comments);
            }
        })
    },[])

    const refreshFunc = (newComment) => {
        setCommentList(CommentList.concat(newComment));
    }
    const onClickModify = () => {
        props.history.push(`/video/modify/${videoId}`);
    }
    const onClickDelete = () => {
        let confirm = window.confirm("삭제하시겠습니까?");
        if(confirm){
            dispatch(deleteVideo(body)).then(res => {
                if(res.payload.success){
                    message.success('삭제되었습니다.');
                    setTimeout(()=>{
                        props.history.push('/');
                    },2000);
                } else {
                    message.error('실패하였습니다.');
                }
            })
        }
    }

    if(Video.writer){
        let videoWriterImage = Video.writer.image === undefined ? '/images/undefined-user.jpg' : Video.writer.image ;
        const likeDisLikeBtn = <LikeDisLike video userId={localStorage.getItem("userId")} videoId={videoId} />;
        const subscribeBtn = Video.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} />;
        const modifyBtn = Video.writer._id === localStorage.getItem('userId') && <Button onClick={onClickModify} size="large">Modify</Button>;
        const deleteBtn = Video.writer._id === localStorage.getItem('userId') && <Button onClick={onClickDelete} size="large">Delete</Button>;
        const actionBtn = () => {
            if( Video.writer._id !== localStorage.getItem('userId')){
                return [
                    likeDisLikeBtn, subscribeBtn
                ]
            } else {
                return [
                    modifyBtn, deleteBtn
                ]
            }
        }
        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{width:'100%', padding:'3rem 4rem'}}>
                        <video style={{width:'100%'}} src={`${serverURL}/${Video.filePath}`} controls />
                        <List.Item actions={actionBtn()}>
                            <List.Item.Meta
                                avatar={<Avatar src={videoWriterImage} />}
                                title={Video.writer.name}
                                description={Video.description}
                                >
                            </List.Item.Meta>
                        </List.Item>
    
                        {/* comments */}
                        <Comment refreshFunc={refreshFunc} postId={videoId} commentList={CommentList}/>
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        );
    
    } else {
        return (
            <div>...loading</div>
        )
    }
}

export default VideoDetailPage;