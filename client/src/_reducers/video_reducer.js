import { GET_VIDEO, GET_VIDEO_DETAIL, UPLOAD_VIDEO, UPLOAD_VIDEO_FILE } from '../_actions/types';

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
        default:
            return state;
    }
}