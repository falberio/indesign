import {   
    UPDATE_PARTS_SELECTED_QUANTITY, 
    UPDATE_PARTS_QUANTITIES,
    UPDATE_PARTS_IS_SUMMABLE,
    UPDATE_PARTS_IS_REDUCIBLE,
    ADD_PART,
    REMOVE_PART
} from '../../types';

export default (state, action) => {
    
    switch(action.type) {

        case UPDATE_PARTS_SELECTED_QUANTITY:
            return {
                ...state,
                quantities: {
                    ...state.quantities,
                    selected: action.payload
                }
            }

        case UPDATE_PARTS_QUANTITIES:
            return {
                ...state,
                quantities: action.payload
            }

        case UPDATE_PARTS_IS_REDUCIBLE:
            return {
                ...state,
                quantities: {
                    ...state.quantities,
                    isReducible: action.payload
                }
            }

        case UPDATE_PARTS_IS_SUMMABLE:
            return {
                ...state,
                quantities: {
                    ...state.quantities,
                    isSummable: action.payload
                }
            }

        default:
            return state;
    }
}