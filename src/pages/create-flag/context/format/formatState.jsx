import React, {useReducer} from 'react';
import FormatContext from './formatContext';
import FormatReducer from './formatReducer';
import formatsJson from './formats.json';

import {   
    UPDATE_SELECTED_FORMAT,
    UPDATE_SELECTED_SUBFORMAT,
    UPDATE_FORMAT_QUANTITIES,
    CHANGE_DIMENSIONS
} from '../../types';

const FormatState = props => {

    let allFormats = formatsJson[0].data;

    const initialState = {
        "selectedFormat": {
            "name": "lines",
            "selectedSubformat": "vertical",
            "subformats": ["vertical", "horizontal"],
            "dimensions": {
                "item_1": {"_id": 1, "size": 33.3333},
                "item_2": {"_id": 2, "size": 33.3333},
                "item_3": {"_id": 3, "size": 33.3333}
            },
            "colores": {
                "min": 2,
                "max": 8,
                "isSummable": true,
                "isReducible": true,
                "selected": 2
            },
            "parts": {
                "min": 2,
                "max": 8,
                "isSummable": true,
                "isReducible": true,
                "selected": 2,
                "isModifiable": true
            }
        },   
        formats: allFormats
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(FormatReducer, initialState);


    const updateSelectedFormat = (newFormatSelected) => {
        
        dispatch({
            type: UPDATE_SELECTED_FORMAT,
            payload: newFormatSelected
        })
    }

    const updatedSelectedSubformat = (e) => {
        const newSubformatSelected = e.target.value;
        console.log("Se modificó el Subformato")
        
        dispatch({
            type: UPDATE_SELECTED_SUBFORMAT,
            payload: newSubformatSelected
        })
    }

    const updateFormatQuantitiesSelected = (modifier) => {
        console.log("Hasta acá");
        const selectedFormat = state.selectedFormat;
        selectedFormat.parts.selected = selectedFormat.parts.selected + 1;
        dispatch({
            type: UPDATE_FORMAT_QUANTITIES,
            payload: selectedFormat

        })
    }

    const changeDimensions = (e) => {
        const {value, id} = e.target;
        console.log(id);
        let dimensionSelected = Object.values(state.selectedFormat.dimensions).filter(dimension => dimension._id == id)[0];
        dimensionSelected.size = value;
        console.log(dimensionSelected);

        dispatch({
            type: CHANGE_DIMENSIONS,
            payload: dimensionSelected
        })
    }


    return ( 
        <FormatContext.Provider
            value={{
                formats: state.formats,
                selectedFormat: state.selectedFormat,
                selectedSubformat: state.selectedFormat.selectedSubformat,
                updateSelectedFormat,
                updatedSelectedSubformat,
                updateFormatQuantitiesSelected,
                changeDimensions
            }}
        >
            {props.children}
        </FormatContext.Provider>
     );
}
 
export default FormatState;