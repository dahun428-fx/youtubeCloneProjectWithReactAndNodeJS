import axios from "axios";
import {UPLOAD_VIDEO, UPLOAD_VIDEO_FILE, THUMBNAIL_VIDEO, GET_VIDEO, GET_VIDEO_DETAIL, GET_SUSCRIPTION_VIDEOS} from './types';

export function uploadVideoFiles(body){
    const config = {
        header : {'content-type':'multipart/form-data'}
    }
    const request = axios.post('/api/videos/uploadfiles', body, config).then(res => res.data);
    return {
        type : UPLOAD_VIDEO_FILE,
        payload : request 
    }
}
export function thumbnailVideo(body){
    const request = axios.post('/api/videos/thumbnail', body).then(res => res.data);
    return {
        type : THUMBNAIL_VIDEO,
        payload : request,
    }
}
export function uploadVideo(body){
    const request = axios.post('/api/videos/uploadVideo', body).then(res => res.data);
    return {
        type : UPLOAD_VIDEO,
        payload : request,
    }
}
export function getVideos(){
    const request = axios.get('/api/videos/getVideos').then(res => res.data);
    return {
        type : GET_VIDEO,
        payload : request
    }
}
export function getVideo(body){
    const request = axios.post('/api/videos/getVideo', body).then(res => res.data);
    return {
        type : GET_VIDEO_DETAIL,
        payload : request
    }
}
export function getSubscriptionVideos(body){
    const request = axios.post('/api/videos/getSubscriptionVideos', body).then(res => res.data);
    return {
        type : GET_SUSCRIPTION_VIDEOS,
        payload : request
    }
}