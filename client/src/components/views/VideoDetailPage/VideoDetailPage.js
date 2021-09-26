import React, { useEffect, useState } from 'react';
import { Col, Row, List, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getVideo } from '../../../_actions/video_action';
import { serverURL } from '../../Config/Config';  
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import { getComments } from '../../../_actions/comment_action';
import LikeDisLike from './Sections/LikeDisLike';

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

    if(Video.writer){
        let videoWriterImage = Video.writer.image === undefined ? '/images/undefined-user.jpg' : Video.writer.image ;
        const subscribeBtn = Video.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} />;
        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{width:'100%', padding:'3rem 4rem'}}>
                        <video style={{width:'100%'}} src={`${serverURL}/${Video.filePath}`} controls />
                        <List.Item actions={[<LikeDisLike video userId={localStorage.getItem("userId")} videoId={videoId} />, subscribeBtn]}>
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