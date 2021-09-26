import { GET_COMMENTS, SAVE_COMMENT } from "../_actions/types";

export default function reducer ( state={}, action ){
    switch( action.type ){
        case SAVE_COMMENT :
            return {...state, saveComment : action.payload }
        case GET_COMMENTS :
            return {...state, getComments : action.getComments }
        default :
            return state;
    }
}