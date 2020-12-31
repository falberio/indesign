import React, {useReducer} from 'react';
import PartContext from './partContext';
import PartReducer from './partReducer';

import {   
    UPDATE_PARTS_SELECTED_QUANTITY, 
    UPDATE_PARTS_QUANTITIES,
    UPDATE_PARTS_IS_SUMMABLE,
    UPDATE_PARTS_IS_REDUCIBLE,
    ADD_PART,
    REMOVE_PART
} from '../../types';

const PartState = props => {

    // Set de valores iniciales
    const initialState = {
        quantities: {
            min: 2,
            max: 8,
            allowed: [2,3,4,5,6,7,8],
            isSummable: true,
            isReducible: true,
            selected: 3,
            isModifiable: true
        },
        colors: [
            {"name": "--first-color","_id": 1, "_value": "#b57373", "type": "general"},
            {"name": "--second-color","_id": 2, "_value": "#3ca2b4", "type": "general"},
            {"name": "--third-color","_id": 3, "_value": "#5cbc67", "type": "general"},
            {"name": "userColor","_id": 4, "_value": "#8442b1", "type": "item", "parts": [4]}
        ]
        
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(PartReducer, initialState);



    const updatePartsSelectedQuantity = (newQuantitySelected) => {
        const {selected} = state.quantities;
        let modifier = newQuantitySelected - selected;
        updateIsReducible(modifier);
        updateIsSummable(modifier);

        dispatch({
            type: UPDATE_PARTS_SELECTED_QUANTITY,
            payload: newQuantitySelected
        })
    }

    const updatePartsQuantities = (q) => {

        dispatch({
            type: UPDATE_PARTS_QUANTITIES,
            payload: q
        })
    }

    const updateIsSummable = (modifier) => {
        const {max, selected} = state.quantities;
        let selectedUpdated = selected + modifier;
        let res = selectedUpdated < max ? true : false;

        dispatch({
            type: UPDATE_PARTS_IS_SUMMABLE,
            payload: res
        })
    }

    const updateIsReducible = (modifier) => {
        const {min, selected} = state.quantities;
        let selectedUpdated = selected + modifier;
        let res = selectedUpdated > min ? true : false;

        dispatch({
            type: UPDATE_PARTS_IS_REDUCIBLE,
            payload: res
        })
    }

    const addPart = () => {
        const {selected, isSummable, allowed} = state.quantities;
        let positionPreviusQuantity = allowed.indexOf(selected);
        if(positionPreviusQuantity === allowed.length) {
            return null;
        } 
        let nextQuantity = allowed[positionPreviusQuantity + 1];
        if(isSummable) {
            updatePartsSelectedQuantity(nextQuantity);
        }
    }

    const removePart = () => {
        const {selected, isReducible, allowed} = state.quantities;
        let positionPreviusQuantity = allowed.indexOf(selected);
        if(positionPreviusQuantity === 0) {
            return null;
        } 
        let nextQuantity = allowed[positionPreviusQuantity - 1];
        if(isReducible) {
            updatePartsSelectedQuantity(nextQuantity);
        }
    }



    return(
        <PartContext.Provider
            value={{
                parts: state.quantities,
                customColors: state.colors,
                updatePartsSelectedQuantity,
                updatePartsQuantities,
                addPart,
                removePart
            }}
        >
            {props.children}
        </PartContext.Provider>
    )
}
 
export default PartState;