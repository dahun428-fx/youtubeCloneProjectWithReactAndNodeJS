import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideos } from '../../../../_actions/video_action';
import { serverURL } from '../../../Config/Config';  

function SideVideo(props){

    const dispatch = useDispatch();
    
    const [ VideoList, setVideoList ] = useState([]);

    useEffect(()=>{
        dispatch(getVideos()).then(res => {
            if(res.payload.success){
                setVideoList(res.payload.videos);
            }
        })
    },[])

    const renderList = VideoList.map((video, index)=>{
        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration - minutes * 60);

        return (
             <div style={{ display:'flex', marginBottom:'1rem', padding:'0 2rem'}} key={index}>
                <div style={{width:'40%', marginRight:'1rem'}}>
                    <a href={`/video/${video._id}`}  style={{ color:'gray' }}>
                        <img style={{width:'100%', height:'100%'}}
                        src={`${serverURL}/${video.thumbnail}`}
                        alt="thumbnail" />
                    </a>
                </div>
                <div style={{width:'50%'}}>
                    <a href={`/video/${video._id}`} style={{ color:'gray' }}>
                        <span style={{fontSize:'1rem', color:'black'}}>{video.title}</span><br />
                        <span>{video.writer.name}</span><br />
                        <span>{video.views}</span><br />
                        <span>{`${minutes} : ${seconds}`}</span>
                    </a>
                </div>
            </div>
        );
    })

    return(
        <>
            <div style={{ marginTop:'3rem' }}></div>
            {renderList}
        </>
    )
}
export default SideVideo;