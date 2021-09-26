import axios from "axios";
import { SUBSCRIBE, SUBSCRIBED_USER, SUBSCRIBE_NUMBER, UNSUBSCRIBE } from "./types";

export function subscribeNumber(body){
    const request = axios.post('/api/subscribe/subscribeNumber', body).then(res => res.data);
    return {
        type : SUBSCRIBE_NUMBER,
        payload : request 
    }
}
export function subscribed(body){
    const request = axios.post('/api/subscribe/subscribed', body).then(res => res.data);
    return {
        type : SUBSCRIBED_USER,
        payload : request
    }
}
export function unSubscribe(body){
    const request = axios.post('/api/subscribe/unsubscribe', body).then(res => res.data);
    return {
        type : UNSUBSCRIBE,
        payload : request,
    }
}
export function subscribe(body){
    const request = axios.post('/api/subscribe/subscribe', body).then(res => res.data);
    return {
        type : SUBSCRIBE,
        payload : request,
    }
}