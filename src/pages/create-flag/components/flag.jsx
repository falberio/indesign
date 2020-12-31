import React, {useContext, useState, Fragment} from 'react';
import ColorContext from '../context/color/colorContext';
import PartContext from '../context/part/partContext';
import ModalContext from '../context/modal/modalContext';

const Flag = () => {

    const partContext = useContext(PartContext);
    const {parts, customColors} = partContext;

    const colorContext = useContext(ColorContext);
    const {colors} = colorContext; 

    const modalContext = useContext(ModalContext);
    const {modal, showModal} = modalContext;

    const obtenerNuevosElementos = () => {
        let elementos = [];
        for(let i = 1; i <= parts.selected; i++) {
            elementos.push(i);
        }
        return elementos;
    }

    const getPartColor = (item) => {
        const index = item - 1;
        const maxAllowed = colors.quantity.selected;
        const partsSelected = parts.selected;
        const colorValueSelected = colors.colores[
            index < maxAllowed ? index : index % maxAllowed
        ]._value;
        return(colorValueSelected);
    }

    const openModal = (e) => {
        const {id} = e.target;
        // let selectedColorValue = Object.values(colors.colores).filter(color => color._id == id && color)[0]._value;
        let selectedColorValue = getPartColor(id);
        // setModal({
        //     ...modal,
        //     active: true,
        //     itemSelected: {
        //         _id: e.target.id,
        //         _value: selectedColorValue
        //     }
        // })
        showModal(id, selectedColorValue);
    }


    return ( 
        <Fragment>
            <div className="content-wrapper">
                <div className="flag-wrapper">
                    <div className="flag" id="flag">
                        
                        {obtenerNuevosElementos().map((item) => (
                            <div 
                                className={"part-" + item}
                                onClick={openModal}
                                key={item}
                                id={item}
                            >
                            </div>
                        ))}

                    </div>
                </div>    
            </div>
        </Fragment>
     );
}
 
export default Flag;