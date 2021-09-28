export default function reducer( state ={}, action){
    switch(action.type){
        case 'collapse':
            return {...state, payload : action.payload}
        default :
            return state;
    }
}