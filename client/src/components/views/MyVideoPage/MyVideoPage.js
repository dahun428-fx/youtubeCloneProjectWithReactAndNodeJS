import React, { useEffect, useState } from 'react';

import { Col, Row, Typography, Card, Avatar, Button, Menu} from 'antd';
import { useDispatch } from 'react-redux';
import { getMyVideos } from '../../../_actions/video_action';
import { serverURL } from '../../Config/Config';  
import moment from 'moment';
import { CategoryList } from '../../../enum/CategoryEnum';

const { Title } = Typography;
const { Meta } = Card;

function MyVideoPage(props){
    
    const dispatch = useDispatch();
    
    const [ Video, setVideo ] = useState([]);
    const [ CategoryVideo, setCategoryVideo] = useState([]);
    const [ MenuTarget, setMenuTarget ] = useState("0");


    useEffect(()=>{
        let body = {
            userId : localStorage.getItem('userId')
        }
        console.log(body);
        dispatch(getMyVideos(body)).then(res => {
            if(res.payload.success){
                setVideo(res.payload.videos);
                setCategoryVideo(res.payload.videos);
                console.log(res.payload.videos);
            } else {
                alert('비디오 가져오기를 실패했습니다.');
            }
        })

    },[])
    
    const onClickCategoryHandler = (category, videoList) => {
        if(Number(category.value) > Number(CategoryList[0].value)){
            let list = videoList.filter((video) => {
                return Number(video.category) === Number(category.value);
            })
            setCategoryVideo(list);
        } else {
            setCategoryVideo(Video);
        }
    }
    const onClickMenuHandler = (event) => {
        setMenuTarget(event.key);
        
    }
    const menu = CategoryList.map((category, index) => {
        return ( 
            <Menu.Item key={index} onClick={()=>onClickCategoryHandler(category, Video)} >
                <Button shape="round">{category.label}</Button>
            </Menu.Item>
        ) 
    })
    const renderCards = CategoryVideo.map((video, index)=>{
        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration - minutes * 60);
        let videoWriterImage = video.writer.image === undefined ? '/images/undefined-user.jpg' : video.writer.image ;
        
        return (
            <Col lg={6} md={8} xs={24} key={index} style={{margin:'10px 0'}}>
                <a href={`/video/${video._id}`}>
                    <div style={{position : 'relative'}}>
                        <img style={{width:'100%'}} src={`${serverURL}/${video.thumbnail}`} alt={video.fileName} />
                        <div className="duration"
                        style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                        color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                        padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                        fontWeight:'500', lineHeight:'12px' }}>
                            <span>{`${minutes} : ${seconds}`}</span>
                        </div>
                    </div>
                </a>
                <br />
                <Meta 
                    avatar={
                        <Avatar src={videoWriterImage} />
                    }
                    title={video.title}
                />
                <span>{video.writer.name}</span>
                <span style={{marginLeft:'3rem'}}>{video.views} views</span><span style={{marginLeft:'2rem'}}>( {moment(video.creatAt).format("YYYY/MM/DD")} )</span>
            </Col>
        );
    })
    
    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}>
                MyVideo
                <hr/>
                <Menu mode="horizontal" onClick={onClickMenuHandler} selectedKeys={MenuTarget}>
                    {menu}
               </Menu>
            </Title>
            <hr />
            <Row gutter={[32,16]}>
                {renderCards}
            </Row>
        </div>
    )

}
export default MyVideoPage;