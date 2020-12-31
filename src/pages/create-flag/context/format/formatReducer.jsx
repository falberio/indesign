import {   
    UPDATE_SELECTED_FORMAT,
    UPDATE_SELECTED_SUBFORMAT,
    UPDATE_FORMAT_QUANTITIES,
    CHANGE_DIMENSIONS
} from '../../types';

export default (state, action) => {

    switch(action.type) {

        case UPDATE_SELECTED_FORMAT:
            return {
                ...state,
                selectedFormat: action.payload
            }  

        case UPDATE_SELECTED_SUBFORMAT:
            return {
                ...state,
                selectedFormat: {
                    ...state.selectedFormat,
                    selectedSubformat: action.payload
                }
            }

        case UPDATE_FORMAT_QUANTITIES:
            return {
                ...state,
                selectedFormat: action.payload,
                formats: Object.values(state.formats).map(format => format.name === action.payload.name ? action.payload : format)
            }

        case CHANGE_DIMENSIONS:
            return {
                ...state,
                selectedFormat: {
                    ...state.selectedFormat,
                    dimensions: Object.values(state.selectedFormat.dimensions).map(dimension => dimension._id === action.payload.id ? action.payload : dimension)
                }
            }



        default:
            return state;
    }
}