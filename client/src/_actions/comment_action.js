import axios from 'axios';
import { GET_COMMENTS, SAVE_COMMENT } from './types';

export function saveComment(body){
    const request = axios.post('/api/comment/saveComment', body).then(res => res.data);
    return {
        type : SAVE_COMMENT,
        payload : request
    }
}
export function getComments(body){
    const request = axios.post('/api/comment/getComments', body).then(res => res.data);
    return {
        type : GET_COMMENTS,
        payload : request
    }
}