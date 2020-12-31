import {   
    ADD_COLOR,
    REMOVE_COLOR,
    UPDATE_SELECTED_COLOR,
    UPDATE_QUANTITY,
    UPDATE_IS_SUMMABLE,
    UPDATE_COLORS_SELECTED_QUANTITY,
    UPDATE_IS_REDUCIBLE,
    UPDATE_COLOR_QUANTITIES,
    UPDATE_ACTIVATED_COLORS,
    UPDATE_CUSTOM
} from '../../types';

export default (state, action) => {
    
    switch(action.type) {

        case UPDATE_SELECTED_COLOR:
            return {
                ...state,
                colors: {
                    ...state.colors,
                    colores: state.colors.colores.map(color => color._id === action.payload._id  ? action.payload : color)
                }
            }

        case UPDATE_IS_SUMMABLE:
            return {
                ...state,
                colors: {
                    ...state.colors,
                    quantity: {
                        ...state.colors.quantity,
                        isSummable: action.payload
                    }
                }
            }

        case UPDATE_IS_REDUCIBLE:
            return {
                ...state,
                colors: {
                    ...state.colors,
                    quantity: {
                        ...state.colors.quantity,
                        isReducible: action.payload
                    }
                }
            }

        case UPDATE_COLORS_SELECTED_QUANTITY:
            return {
                ...state,
                colors: {
                    ...state.colors,
                    quantity: {
                        ...state.colors.quantity,
                        selected: state.colors.quantity.selected + action.payload
                    }
                }
            }

        case UPDATE_COLOR_QUANTITIES:
            return {
                ...state,
                colors: {
                    ...state.colors,
                    quantity: action.payload
                }
            }

        case UPDATE_ACTIVATED_COLORS:
            return {
                ...state,
                colors: {
                    ...state.colors,
                    colores: action.payload
                }
            }

        case UPDATE_CUSTOM:
            return {
                ...state,
                colors: {
                    ...state.colors,
                    custom: state.colors.custom === true ? false : true
                }
            }

        default:
            return state;
    }
}