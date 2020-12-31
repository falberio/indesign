import React, {useReducer} from 'react';
import ModalContext from './modalContext';
import ModalReducer from './modalReducer';

import { 
    OPEN_MODAL,
    CLOSE_MODAL
} from '../../types';

const ModalState = props => {

    // Set de valores iniciales
    const initialState = {
        itemSelected: {
            _id: '',
            _value: ''
        },
        active: false
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(ModalReducer, initialState);

    const showModal = (id, selectedColorValue) => {
        let item = {
            _id: id,
            _value: selectedColorValue
        }

        dispatch({
            type: OPEN_MODAL,
            payload: item
        })
    }

    const closeModal = () => {
        dispatch({
            type: CLOSE_MODAL
        })
    }


    return(
        <ModalContext.Provider
            value={{
                modal: state,
                showModal,
                closeModal
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}
 
export default ModalState;