import axios from 'axios';
import {LOGIN_USER, REGISTER_USER, LOGOUT_USER, AUTH_USER} from './types';

export function loginUser(body){
    const request = axios.post('/api/users/login', body).then(res => res.data);
    return {
        type : LOGIN_USER,
        payload : request
    }
}
export function registerUser(body){
    const request = axios.post('/api/users/register', body).then(res => res.data);
    return {
        type : REGISTER_USER,
        payload : request,
    }
}
export function logout(){
    const request = axios.get('/api/users/logout').then(res => res.data);
    return {
        type : LOGOUT_USER,
        payload : request,
    }
}
export function auth(){
    const request = axios.get('/api/users/auth').then(res => res.data);
    return {
        type : AUTH_USER,
        payload : request,
    }
}