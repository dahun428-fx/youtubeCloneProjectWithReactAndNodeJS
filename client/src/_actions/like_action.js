import axios from "axios";
import { DOWN_DISLIKE, DOWN_LIKES, GET_DISLIKES, GET_DISLIKES_BY_USER, GET_LIKES, GET_LIKES_BY_USER, UP_DISLIKE, UP_LIKES, } from "./types";

export function getLikes(body){
    const request = axios.post('/api/like/getLikes', body).then(res => res.data);
    return {
        type : GET_LIKES,
        payload : request,
    }
}
export function getLikesByUser(body){
    const request = axios.post('/api/like/getLikesByUser', body).then(res => res.data);
    return {
        type : GET_LIKES_BY_USER,
        payload : request,
    }
}
export function upLike(body){
    const request = axios.post('/api/like/upLike', body).then(res => res.data);
    return {
        type : UP_LIKES,
        payload : request,
    }
}
export function downLike(body){
    const request = axios.post('/api/like/downLike', body).then(res => res.data);
    return {
        type : DOWN_LIKES,
        payload : request,
    }
}
export function getDisLikes(body){
    const request = axios.post('/api/like/getDisLikes', body).then(res => res.data);
    return {
        type : GET_DISLIKES,
        payload : request,
    }
}
export function getDisLikesByUser(body){
    const request = axios.post('/api/like/getDisLikesByUser', body).then(res => res.data);
    return {
        type : GET_DISLIKES_BY_USER,
        payload : request,
    }
}
export function upDisLike(body){
    const request = axios.post('/api/like/upDisLike', body).then(res => res.data);
    return {
        type : UP_DISLIKE,
        payload : request,
    }
}
export function downDisLike(body){
    const request = axios.post('/api/like/downDisLike', body).then(res => res.data);
    return {
        type : DOWN_DISLIKE,
        payload : request,
    }
}





