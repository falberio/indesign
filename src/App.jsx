import React, {Fragment, useState} from 'react';
import Letra from './components/Letra';
import {Global, css} from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCircle, 
  faCheckCircle, 
  faSquare, 
  faCheckSquare, 
  faArrowCircleUp, 
  faArrowCircleDown
} from '@fortawesome/free-solid-svg-icons';
import { 
  faCircle as farCircle, 
  faCheckCircle as farCheckCircle,
  faArrowAltCircleUp as farArrowUp
} from '@fortawesome/free-regular-svg-icons';

function App() {

  const [texto, setTexto] = useState('indesing');
  const [colorElegido, setColorElegido] = useState('black');
  const [forma, setForma] = useState('redondo');
  const [animacion, setAnimacion] = useState(false);
  const [bg, setBg] = useState(true);
  const [borde, setBorde] = useState(true);
  const [tipografia, setTipografia] = useState('serif');
  const [menuColapsado, setMenuColapsado] = useState(true);
  let letra = '';
  let letras = texto.split('');
  let formaElegida = '';

  if(forma === 'cuadrado') {
    formaElegida = '0';
  } else {
    formaElegida = '50%'
  }

  const modificarTexto = (e) => {
    console.log('El texto ha sido modificado');
    setTexto(e.target.value);
  }

  const cambiarColor = (e) => {
    console.log(e.target.value);
    setColorElegido(e.target.value);
  }

  const cambiarForma = (e) => {
    console.log("La forma elegida ha cambiado a: ", e.target.value);
    setForma(e.target.value);
  }
  
  const modificarAnimacion = () => {
    console.log("La animación elegida ha cambiado");
    if(animacion) {
      setAnimacion(false);
    } else {
      setAnimacion(true);
    }
  }

  const modificarBg = (e) => {
    console.log("Se ha modificado el set de BG a: ", e.target.value)
    if(bg) {
      setBg(false);
    } else {
      setBg(true);
    }
  }

  const modificarBorde = (e) => {
    console.log("Se ha modificado el borde a: ", e.target.value)
    if(borde) {
      setBorde(false);
    } else {
      setBorde(true);
    }
  }

  const modificarTipografia = (e) => {
    console.log("Se ha modificado la tipografía a: ", e.target.value);
    setTipografia(e.target.value);
  }

  const ocultarMenu = () => {
    console.log('El menu se hace colapsado');
    if(menuColapsado) {
      setMenuColapsado(false);
    } else {
      setMenuColapsado(true);
    }
  }
  
  const submitFormulario = (e) => {
    e.preventDefault();
  }

  const colores = ['black', 'grey', 'navy', 'aqua', 'orange', 'violet', 'teal', 'pink'];
  const tipografias = ['serif', 'fantasy', 'cursive', 'Roboto', 'Helvetica'];

  return (
    <Fragment>

    <Global
      styles={css`
        .circle {
          background-color: ${bg ? colorElegido : 'transparent'};
          border-color: ${borde ? colorElegido : 'transparent'};
          border-radius: ${formaElegida};
          animation: ${animacion ? 'spin 10s linear infinite' : 'none'};
        }

        .letra {
          color: ${bg ? 'white' : colorElegido};
          font-family: ${tipografia} !important;
        }

        .animacionBtn {
          animation: ${animacion ? 'spin 5s linear infinite' : 'none'};
        }

        .form-group {
          display: ${menuColapsado ? 'none' : 'flex'};
        }

      `}
    />

    
      <form className="formulario" onSubmit={submitFormulario}>

        

        <div className="forma-wrapper form-group">

          <p>Forma: </p>
          <input 
            type="radio" 
            name="forma" 
            id="redondo"
            value="redondo" 
            onChange={cambiarForma}
          />
          <label htmlFor="redondo">
            <FontAwesomeIcon 
              icon={forma==='redondo' ? faCheckCircle : faCircle}
            />
          </label>

          <input 
            type="radio" 
            name="forma" 
            id="cuadrado"
            value="cuadrado" 
            onChange={cambiarForma}
          />
          <label htmlFor="cuadrado">
            <FontAwesomeIcon 
              icon={forma==='cuadrado' ? faCheckSquare : faSquare}
            />
          </label>

        </div>

        <div className="animacion-wrapper form-group">

          <p>Animación: </p>
          <input 
            type="radio" 
            name="animacion" 
            id="animacion"
            value="animacion" 
            onClick={modificarAnimacion}
          />
          <label htmlFor="animacion">
            <FontAwesomeIcon 
              className="animacionBtn"
              icon={
                animacion ? faCheckCircle :  faCircle
              }
            />
          </label>

        </div>

        <div className="bg-wrapper form-group">

          <p>Fondo: </p>
          <input 
            type="radio" 
            name="bg" 
            id="bg"
            value="true" 
            onClick={modificarBg}
          />
          <label htmlFor="bg">
            <FontAwesomeIcon 
              icon={
                bg ? faCircle :  farCircle
              }
            />
          </label>

        </div>

        <div className="color-wrapper form-group">
          <p>Color: </p>

          
          {colores.map(color => (
            
            <div>
              <input 
                type="radio" 
                name="color" 
                id={color}
                value={color}
                onChange={cambiarColor}
              />
              <label htmlFor={color}>
                <FontAwesomeIcon 
                  icon={colorElegido===color ? faCheckCircle : faCircle}
                  style={{color: color}}
                />
              </label>
            </div>

          ))}

        </div>

        <div className="borde-wrapper form-group">

          <p>Borde: </p>
          <input 
            type="radio" 
            name="borde" 
            id="borde"
            value="true" 
            onClick={modificarBorde}
          />
          <label htmlFor="borde">
            <FontAwesomeIcon 
              icon={
                borde ? farCheckCircle :  farCircle
              }
            />
          </label>

        </div>


        <div className="font-wrapper form-group">
          
          <p>Tipografía: </p>
          <select 
            name="tipografia" 
            id="tipografia"
            onChange={modificarTipografia}
          >
            {tipografias.map(tipografia => (
            
              <option 
                value={tipografia} 
                  style={{'font-family': tipografia}}
              >{tipografia}
              </option>
             
            ))}
          </select>

        </div>

        <div className="btn-colapse">
          <FontAwesomeIcon 
            icon={
              menuColapsado ? faArrowCircleDown : faArrowCircleUp
            }
            style={{'font-size': '2rem', cursor: 'pointer'}}
            onClick={ocultarMenu}
          />
        </div>

        <div className="texto-wrapper">
          <input 
            type="text" 
            value={texto}
            id="tutexto" 
            name="texto"
            onChange={modificarTexto}
          />
        </div>
          


      </form>


    <div className="page-wrapper">

      {letras.map(letra => (
            <Letra 
              key={letra}
              letra={letra}
            />
          )
      )}
     
    </div>

    </Fragment>
  );
}

export default App;
