import React from 'react';

const Letra = ({letra}) => {


    return ( 
        <div className="letra-wrapper">
            <div className="fondo"></div>
            <div className="letra">
                <p>{letra}</p>  
            </div>
        </div>
     );
}
 
export default Letra;