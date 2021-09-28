import { combineReducers } from "redux";
import user from './user_reducer';
import video from './video_reducer';
import subscriber from './subscriber_reducer';
import comment from './comment_reducer';
import like from './like_reducer';
import active from './active_reducer';
const rootReducer = combineReducers({
    user, 
    video,
    subscriber,
    comment,
    like,
    active,
});

export default rootReducer; 