import {   
    OPEN_MODAL,
    CLOSE_MODAL
} from '../../types';

export default (state, action) => {
    
    switch(action.type) {

        case OPEN_MODAL:
            return {
                ...state,
                active: true,
                itemSelected: action.payload
            }

        case CLOSE_MODAL:
            return {
                ...state,
                active: false
            }

        default:
            return state;
    }
}