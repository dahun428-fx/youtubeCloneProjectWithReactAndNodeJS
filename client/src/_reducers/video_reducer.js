import { DELETE_VIDEO, GET_MY_VIDEO, GET_VIDEO, GET_VIDEO_DETAIL, MODIFY_VIDEO, UPLOAD_VIDEO, UPLOAD_VIDEO_FILE } from '../_actions/types';

export default function reducer (state = {}, action ){
    switch( action.type ){
        case UPLOAD_VIDEO:
            return { ...state, uploadVideo : action.payload }
        case UPLOAD_VIDEO_FILE:
            return { ...state, uploadVideoFile : action.payload}
        case GET_VIDEO:
            return { ...state, getVideo : action.payload }
        case GET_VIDEO_DETAIL:
            return { ...state, getVideoDetail : action.payload}
        case MODIFY_VIDEO :
            return {...state, modifyVideo : action.payload }
        case DELETE_VIDEO :
            return {...state, deleteVideo : action.payload }   
        case GET_MY_VIDEO :
            return {...state, getMyVideo : action.payload }
        default:
            return state;
    }
}