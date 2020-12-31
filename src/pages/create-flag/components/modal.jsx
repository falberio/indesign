import React, {useState, useContext} from 'react';
import ModalContext from '../context/modal/modalContext';


const Modal = () => {

    const modalContext = useContext(ModalContext);
    const {modal, closeModal} = modalContext;

    const changePartColor = () => {

    }

    return ( 
        <div id="modal" className={`modal ${modal.active === true  ? 'active' : 'inactive'}`}>
            <div className="modal-content">
                <h2>Modal</h2>
                <p>Modal para modificar color.</p>
                <input 
                    type="color" 
                    value={modal.itemSelected._value}
                    onChange={changePartColor}
                    id={modal.itemSelected.id}
                />
                <button onClick={closeModal}>Cerrar</button>
            </div>  
        </div>
     );
}
 
export default Modal;