import React, {useState, useContext} from 'react';
import ColorContext from '../context/color/colorContext';
import PartContext from '../context/part/partContext';
import FormatContext from '../context/format/formatContext';
import '../create-flag.scss'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPlus,
    faMinus,
    faAngleLeft as faOcultar,
    faCircle
} from '@fortawesome/free-solid-svg-icons';
import { 
  faCircle as farCircle,
  faWindowClose as faClose,
  faCheckCircle as farCheckCircle,
} from '@fortawesome/free-regular-svg-icons';

const Sidebar = () => {

    const colorContext = useContext(ColorContext);
    const {
        colors, 
        updateColor, 
        addColor, 
        removeColor, 
        updateColorQuantities, 
        updateColorsSelectedQuantity,
        updateColors, 
        updateIsReducible, 
        updateIsSummable, 
        updateActivatedColors,
        updateCustom
    } = colorContext; 

    const partContext = useContext(PartContext);
    const {
        parts, 
        customColors,
        updatePartsSelectedQuantity, 
        updatePartsQuantities, 
        addPart, 
        removePart
    } = partContext;

    const formatContext = useContext(FormatContext);
    const {
        formats, 
        selectedFormat, 
        selectedSubformat, 
        updateSelectedFormat, 
        updatedSelectedSubformat,
        updateFormatQuantitiesSelected,
        changeDimensions
    } = formatContext;


    const [menuColapsado, setMenuColapsado] = useState(false);
    const [aspectRatio, setAspectRatio] = useState('5:8');


    const aspectRatios = [
        '1:1', '28:37', '2:3', '5:8', '3:5', '1:2'
    ];

    const calcularDimensiones = aspect => {
        let split = aspect.split(":", 2);
        let height = split[0];
        let width = split[1];
        let result = width/height;
        return result;
    }

    const cambiarAspectRatio = (e) => {
        const {value} = e.target;
        setAspectRatio(value);
        calcularDimensiones(aspectRatio);
    }

    const changeFormat = (e) => {
        const newFormatChosen = e.target.value;
        const newFormatSelected = Object.values(formats).filter(formato => formato.name === newFormatChosen && formato)[0];
        updateSelectedFormat(newFormatSelected);
        const {colores, parts} = newFormatSelected;
        updatePartsQuantities(parts);
        updateColorQuantities(colores);
        console.log(colores);
    }

    const cambiarCantidad = (e) => {
        let newQuantitySelected = Number(e.target.value);
        updatePartsSelectedQuantity(newQuantitySelected);
        updateColors(newQuantitySelected);
        updateFormatQuantitiesSelected(newQuantitySelected);
    }

    const obtenerCantidad = () => {
        const {min, max} = parts;
        let cantidades = [];
        for(let i = min; i <= max; i++) {
            cantidades.push(i);
        }
        if(formats.name === 'squares') {
            cantidades = [4, 16, 64];
        }

        return cantidades;
    }

    const addElement = () => {
        let modifier = 1;
        updateIsSummable(modifier, parts.selected + modifier);
        updateIsReducible(modifier, parts.selected + modifier);
        // updateColorsSelectedQuantity(modifier);
        // updateActivatedColors(colors.quantity.selected + modifier);
        addPart();
        // updateFormatQuantitiesSelected(modifier);
    }

    const removeElement = () => {
        let modifier = -1;
        updateIsSummable(modifier, parts.selected + modifier);
        updateIsReducible(modifier, parts.selected + modifier);
        updateColorsSelectedQuantity(modifier);
        updateActivatedColors(colors.quantity.selected + modifier);
        removePart();
        // updateFormatQuantitiesSelected(modifier);
    }

    const addNewColor = () => {
        const partsQuantitySelected = parts.selected;
        addColor(partsQuantitySelected);
    }

    const removeNewColor = () => {
        const partsQuantitySelected = parts.selected;
        removeColor(partsQuantitySelected);
    }

    const ocultarMenu = () => {
        if(menuColapsado) {
            setMenuColapsado(false);
        } else {
            setMenuColapsado(true);
        }
    }

    const submitFormulario = (e) => {
        e.preventDefault();
    }





    return ( 

        <div className={`side-bar ${menuColapsado ? 'colapsed' : 'not-colapsed'}`}>


                    <FontAwesomeIcon 
                        className={`btn-ocultar-menu ${menuColapsado ? 'mostrar' : 'ocultar'}`}
                        icon={
                            faOcultar
                        }
                        onClick={ocultarMenu}
                    />
                    <form className="menu"
                        onSubmit={submitFormulario}
                    >

                        <div className="form-group">
                            <h4>Formato: </h4>
                            <select 
                                name="formatos" 
                                id="formatos"
                                onChange={changeFormat}
                                value={selectedFormat.name}
                            >
                                {Object.keys(formats).map((formato) => (
                                    <option 
                                        value={formato.name}
                                        key={formato._id}
                                    >
                                    {formato}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <h4>Subformato: </h4>
                            <select 
                                name="subformatos" 
                                id="subformatos"
                                onChange={updatedSelectedSubformat}
                                value={selectedSubformat}
                            >
                                {Object.values(selectedFormat.subformats).map((subFormat) => (
                                    <option 
                                        value={subFormat}
                                        key={subFormat}
                                    >
                                    {subFormat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedFormat.name === "circle" || selectedFormat.name === "lines" ? 
                            <div className="form-group form-dimensions">
                                <div className="form-titulo">
                                    <h4>Dimensiones: </h4>
                                </div>

                                <div className="form-content">
                                    {Object.values(selectedFormat.dimensions).map(dimension => (
                                        <input 
                                            type="number"
                                            onChange={changeDimensions}
                                            min="3" 
                                            max="80"
                                            value={dimension.size}
                                            id={dimension._id}
                                        />
                                    ))}
                                    
                                </div>
                            </div>
                        : null    
                        }
                        
                        <div className="form-group form-colores">

                            <div className="form-titulo">
                                <h4>Colores: </h4>
                            </div>

                            <div className="form-content">
                                <div className="colores">
                                    {Object.values(colors.colores).map((color) => (
                                        color.active ?
                                            <input 
                                            className="new-color" 
                                            type="color" 
                                            name={color._id}
                                            value={color._value}
                                            onChange={updateColor}
                                            id={color._id}
                                            key={color._id}
                                        /> 
                                        : null
                                    ))}
                                </div>
                                
                                <div className="botones">
                                    <FontAwesomeIcon 
                                        className={`icon ${colors.quantity.isSummable ? 'active' : 'inactive'}`}
                                        icon={
                                            faPlus
                                        }
                                        onClick={addNewColor}
                                    />
                                
                                    <FontAwesomeIcon 
                                        className={`icon ${colors.quantity.isReducible ? 'active' : 'inactive'}`}
                                        icon={
                                            faMinus
                                        }
                                        onClick={removeNewColor}
                                    />
                                    
                                </div>

                                
                            </div>

                            <div className="custon-wrapper">
                                <p>Personalizado: </p>
                                <input 
                                    type="radio" 
                                    name="custom" 
                                    id="custom"
                                    value="false"
                                    onClick={updateCustom}
                                />
                                <label htmlFor="custom">
                                    <FontAwesomeIcon 
                                    icon={
                                        colors.custom ? farCheckCircle :  farCircle
                                    }
                                    className="icon"
                                    />
                                </label>    
                            </div>
                            
                        
                        </div>

                        {parts.isModifiable ? 
                            <div className="form-group form-cantidad">
                                <div className="form-titulo">
                                    <h4>Partes: </h4>
                                </div>

                                <div className="form-content">

                                    <select 
                                        name="cantidad" 
                                        id="cantidad"
                                        value={parts.selected}
                                        onChange={cambiarCantidad}
                                    >

                                        {obtenerCantidad().map((cant) => (
                                            <option 
                                                value={cant}
                                                key={cant}
                                            >
                                            {cant}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="botones">
                                        <FontAwesomeIcon 
                                            className={`icon ${parts.isSummable ? 'active' : 'inactive'}`}
                                            icon={
                                                faPlus
                                            }
                                            onClick={addElement}
                                        />
                                    
                                        <FontAwesomeIcon 
                                            className={`icon ${parts.isReducible ? 'active' : 'inactive'}`}
                                            icon={
                                                faMinus
                                            }
                                            onClick={removeElement}
                                        />
                                    </div>
                                </div>
                            </div>
                        : null    
                        }

                        <div className="form-group form-aspect-ratio">
                            <h4>Aspect Ratio: </h4>
                            <div className="options">
                                {aspectRatios.map(item => (
                                    <div className="option">
                                        <input 
                                            type="radio" 
                                            name="aspect-ratio" 
                                            id={item}
                                            value={item}
                                            onClick={cambiarAspectRatio}
                                            key={item}
                                        />
                                        <label htmlFor={item}>{item}</label>
                                    </div>
                                ))}
                                
                            </div>  
                            
                            
                       
                        </div>
                    </form>
                    
                </div>

     );
}
 
export default Sidebar;