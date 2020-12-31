import React, {Fragment, useState, useContext, useRef} from 'react';
import {Global, css} from '@emotion/react';
import ColorContext from './context/color/colorContext';
import PartContext from './context/part/partContext';
import FormatContext from './context/format/formatContext';
import './create-flag.scss'; 
import Sidebar from './components/sidebar';
import Flag from './components/flag';
import Modal from './components/modal';


const Banderas = () => {

    // Extraer variables y funciones de los Context
    const colorContext = useContext(ColorContext);
    const {colors} = colorContext; 

    const partContext = useContext(PartContext);
    const {parts, customColors} = partContext;

    const formatContext = useContext(FormatContext);
    const {formats, selectedFormat, selectedSubformat} = formatContext;

    const [modal, setModal] = useState({
        itemSelected: {
            _id: '',
            _value: ''
        },
        active: false
    });

    const [aspectRatio, setAspectRatio] = useState('5:8');

    const calcularDimensiones = aspect => {
        let split = aspect.split(":", 2);
        let height = split[0];
        let width = split[1];
        let result = width/height;
        return result;
    }

    const calcularAnguloDiagonal = (aspect) => {
        let split = aspect.split(":", 2);
        let height = 1;
        let width = split[1]/split[0];
        let hipotenusa = Math.sqrt(Math.pow(height,2) + Math.pow(width,2));
        let seno = height / hipotenusa;
        let angulo = Math.asin(seno)* 180 / Math.PI;
        let angulo2 = 90 - angulo;
        return [angulo, angulo2];
    }

    const getDynamicColor = (index) => {
        let res = '';
        if(!colors.custom){
            res = Object.values(colors.colores).filter(color => color._id === index ? color : '')[0]._value;
        }
        else {
            if(index <= customColors.length){
                res = customColors.filter(color => color._id === index ? color : '')[0]._value;
            }
            else {
                res = 'grey';
            }
        }
        return res;
    }

    const generateFlagRhombus = () => {
        let result = ``;
        if(selectedFormat.name === 'rhombus') {
            
            let x = 3;
            for(let i = 1; i <= 4; i++) {
                let angulos = calcularAnguloDiagonal(aspectRatio);
                
                result = result + `
                    .flag .part-${selectedSubformat === 'invested' ? i : x} {
                        width: 50% !important;
                        height: 50% !important;
                        background: linear-gradient(
                            ${
                                i === 1 ? angulos[0] : 
                                i === 2 ? 360 - angulos[0] :
                                i === 3 ? 180 - angulos [0] :
                                180 + angulos[0]
                            }deg,
                            var(--color1) 0%, 
                            var(--color1) 50%, 
                            var(--color2) 50%,
                            var(--color2) 100%
                        );
                    }
                `;
                
                if(x < 4) {x++} else {x = 1};
            }
            return result;
                
        }
    }

    const generateFlagSquares = () => {
        let result = ``;
        let formato = selectedFormat.name;
        let cant = parts.selected;
        let size = 100 / cant * Math.sqrt(cant);
        if(formato === 'squares') {
            for(let i = 0; i <= cant; i++) {
                let maxAllowed = colors.quantity.selected;
                result = result + `
                    .flag .part-${i + 1} {
                        background-color: ${
                            `var(--color${i < maxAllowed ? i+1 : i % maxAllowed})`
                        };
                        width: ${size}%;
                        height: ${size}%;
                    };
                `
            }

            return result;
        }
    }

    const generateFlagLines = () => {
        let result = ``;
        let vertical = '';
        let cant = parts.selected;
        if(selectedFormat.name === 'lines') {
            if(selectedSubformat === 'vertical') {
                vertical = true;
            } else {
                vertical = false;
            }
            
            let size = `${100/cant}%`;
            let selectedDimensions = selectedFormat.dimensions;

            for(let i = 0; i < cant; i++) {
                let maxAllowed = colors.quantity.selected;
                result = result + `
                    .flag .part-${i+1} {
                        background-color: ${
                            `var(--color${i < maxAllowed ? i+1 : (i % maxAllowed) + 1})`
                        };
                        width: ${vertical ? `${Object.values(selectedDimensions)[0].size}%` : '100%'};
                        height: ${vertical ? '100%' : `${Object.values(selectedDimensions)[0].size}%`};
                    };
                `;
            }
            
            return result;    
        }
    }

    const generateFlagCircles = () => {
        let result= '';
        let dimensions = formats.circle.dimensions.item_1.size;
        if(selectedFormat.name === "circle"){

            result = `
                .flag {
                    background: radial-gradient(
                        circle,
                        var(--color1) 0%, 
                        var(--color1) ${dimensions}%, 
                        var(--color2) ${dimensions}%,
                        var(--color2) 100%
                    );
                }
            `;
        }
        return result;
    }

    const generateFlagDiagonals = () => {
        let result= '';
        let degrees = '';
        let angulo = calcularAnguloDiagonal(aspectRatio);
        if(selectedSubformat === "normal") {
            degrees = angulo[0];
        } else {
            degrees = (angulo[1]*2)+(angulo[0])
        }
        if(selectedFormat.name === "diagonal"){

            result = `
                .flag {
                    background: linear-gradient(
                        ${degrees}deg,
                        var(--color1) 0%, 
                        var(--color1) 50%, 
                        var(--color2) 50%,
                        var(--color2) 100%
                    );
                }
            `;
        }
        return result;
    }
    
    
    
    return ( 
        <Fragment>

        <Global
            styles={css`

                .flag {
                    display: flex;
                    flex-wrap: wrap;
                    width: ${calcularDimensiones(aspectRatio)*400}px;
                    height: 400px;
                }

                .flag-wrapper {
                    --color1: ${getDynamicColor(1)};
                    --color2: ${getDynamicColor(2)};
                    --color3: ${getDynamicColor(3)};
                    --color4: ${getDynamicColor(4)};
                    
                }
                    
                .flagDiagonal2 {
                    background: linear-gradient(
                        ${(calcularAnguloDiagonal(aspectRatio)[1]*2)+(calcularAnguloDiagonal(aspectRatio)[0])}deg,
                        var(--first-color) 0%, 
                        var(--first-color) 50%, 
                        var(--second-color) 50%,
                        var(--second-color) 100%
                    );
                }
                        
                ${generateFlagRhombus()};
                ${generateFlagLines()};
                ${generateFlagSquares()};
                ${generateFlagCircles()};
                ${generateFlagDiagonals()};
            `}
        />

            <div className="container flag-page">

                <Modal />
                <Sidebar />
                <Flag />
                
            </div>
            
        </Fragment>
     );
}
 
export default Banderas;