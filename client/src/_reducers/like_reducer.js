import { DOWN_DISLIKE, DOWN_LIKES, GET_DISLIKES, GET_DISLIKES_BY_USER, GET_LIKES, GET_LIKES_BY_USER, SAVE_DISLIKE, SAVE_LIKES, UP_DISLIKE, UP_LIKES } from "../_actions/types";

export default function reducer ( state = {}, action ){
    switch( action.type ){
        case UP_LIKES :
            return {...state, upLike : action.payload }
        case DOWN_LIKES : 
            return {...state, downLike : action.payload }
        case GET_LIKES : 
            return {...state, getLike : action.payload }
        case GET_LIKES_BY_USER :
            return {...state, getLikesByUser : action.payload }
        case UP_DISLIKE :
            return {...state, upDisLike : action.payload }
        case DOWN_DISLIKE :
            return {...state, downDisLike : action.payload }
        case GET_DISLIKES :
            return {...state, getDisLikes : action.payload }
        case GET_DISLIKES_BY_USER :
            return {...state, getDisLikesByUser : action.payload }
        default : 
            return state;
    }
}