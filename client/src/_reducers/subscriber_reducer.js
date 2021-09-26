import { SUBSCRIBE_NUMBER } from "../_actions/types";

export default function reducer (state = {}, action){
    switch(action.type){
        case SUBSCRIBE_NUMBER:
            return {...state, subscribeNumber : action.payload}
        default:
            return state;
    }
}