import React, {useReducer} from 'react';
import ColorContext from './colorContext';
import ColorReducer from './colorReducer';
import colorsJson from './colors.json';

import {   
    ADD_COLOR,
    REMOVE_COLOR,
    UPDATE_SELECTED_COLOR,
    UPDATE_IS_SUMMABLE,
    UPDATE_COLORS_SELECTED_QUANTITY,
    UPDATE_IS_REDUCIBLE,
    UPDATE_COLOR_QUANTITIES,
    UPDATE_ACTIVATED_COLORS,
    UPDATE_CUSTOM
} from '../../types';

const ColorState = props => {

    // Set de valores iniciales
    const initialState = {
        colors: {
            custom: false,
            quantity: {
                min: 2,
                max: 8,
                allowed: [2,3,4,5,6,7,8],
                isSummable: false,
                isReducible: true,
                selected: 3
            }, 
            colores: [
                {"name": "--first-color", "_id": 1, "_value": "#b57373", "active": true},
                {"name": "--second-color", "_id": 2, "_value": "#3ca2b4", "active": true}, 
                {"name": "--third-color", "_id": 3, "_value": "#5cbc67", "active": true},
                {"name": "--fourth-color", "_id": 4, "_value": "#ced930", "active": false},
                {"name": "-fifth--color", "_id": 5, "_value": "#b14ca0", "active": false},
                {"name": "--sixth-color", "_id": 6, "_value": "#000000", "active": false},
                {"name": "--seveth-color", "_id": 7, "_value": "#c97a1f", "active": false},
                {"name": "--eighth-color", "_id": 8, "_value": "#608574", "active": false}
            ]
        }
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(ColorReducer, initialState);



    const updateColor = (e) => {
        const {value, id} = e.target;
        const respuesta = Object.values(state.colors.colores).filter(color => color._id == id);
        const resultado = respuesta[0];
        resultado._value = value;

        dispatch({
            type: UPDATE_SELECTED_COLOR,
            payload: resultado
        })
    }

    const changeItemColor = (e) => {
        Object.values(state.colors.colores).filter()
    }

    const addColor = (partsQuantitySelected) => {
        const {selected, isSummable, allowed} = state.colors.quantity;
        let positionPreviusQuantity = allowed.indexOf(selected);
        if(positionPreviusQuantity === allowed.length) {
            return null;
        } 
        let newColorsQuantitySelected = allowed[positionPreviusQuantity + 1];
        if(isSummable) {
            updateColors(newColorsQuantitySelected, partsQuantitySelected)
        }
    }


    const removeColor = (partsQuantitySelected) => {
        const {selected, isReducible, allowed} = state.colors.quantity;
        let positionPreviusQuantity = allowed.indexOf(selected);
        if(positionPreviusQuantity === 0) {
            return null;
        } 
        let newColorsQuantitySelected = allowed[positionPreviusQuantity - 1];
        if(isReducible) {
            console.log(newColorsQuantitySelected, partsQuantitySelected);
            updateColors(newColorsQuantitySelected, partsQuantitySelected);
        }
    }

    const updateIsSummable = (modifier, partsQuantitySelected) => {
        const {selected, isSummable, max} = state.colors.quantity;
        let newColorsQuantitySelected = selected + modifier;
        let resultado = newColorsQuantitySelected < max && newColorsQuantitySelected < partsQuantitySelected ? true : false;

        dispatch({
            type: UPDATE_IS_SUMMABLE,
            payload: resultado
        })
    }

    const updateIsReducible = (modifier, partsQuantitySelected) => {
        const {selected, isReducible, min} = state.colors.quantity;
        let newColorsQuantitySelected = selected + modifier;
        let res = newColorsQuantitySelected > min && newColorsQuantitySelected <= partsQuantitySelected ? true : false;
        
        dispatch({
            type: UPDATE_IS_REDUCIBLE,
            payload: res
        })
    }

    const updateColorsSelectedQuantity = (newQuantitySelected) => {
        dispatch({
            type: UPDATE_COLORS_SELECTED_QUANTITY,
            payload: newQuantitySelected
        })
    }

    const updateColorQuantities = (newQuantities) => {
        updateActivatedColors(newQuantities.selected);

        dispatch({
            type: UPDATE_COLOR_QUANTITIES,
            payload: newQuantities
        })
    }

    const updateActivatedColors = (newQuantitySelected) => {
        const res = Object.values(state.colors.colores).map(color => {
            color._id > newQuantitySelected ? color.active = false : color.active = true;
            return color
        });

        dispatch({
            type: UPDATE_ACTIVATED_COLORS,
            payload: res
        })
    }

    const updateColors = (newColorsQuantitySelected, partsQuantitySelected) => {
        updateActivatedColors(newColorsQuantitySelected);
        let previusQuantitySelected = state.colors.quantity.selected;
        let modifier = newColorsQuantitySelected - previusQuantitySelected;
        updateIsReducible(modifier, partsQuantitySelected);
        updateIsSummable(modifier, partsQuantitySelected);
        updateColorsSelectedQuantity(modifier);
    }

    const updateCustom = () => {

        dispatch({
            type: UPDATE_CUSTOM
        })
    }





    return(
        <ColorContext.Provider
            value={{
                colors: state.colors,
                updateColor,
                updateColorsSelectedQuantity,
                addColor,
                removeColor,
                updateColorQuantities,
                updateActivatedColors,
                updateColors,
                updateIsReducible,
                updateIsSummable,
                updateCustom
            }}
        >
            {props.children}
        </ColorContext.Provider>
    )
}
 
export default ColorState;