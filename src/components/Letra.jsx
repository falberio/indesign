import React from 'react';

const Letra = ({letra}) => {


    return ( 
        <div className="circle-wrapper">
            <div className="circle"></div>
            <div className="letra">
                <p>{letra}</p>  
            </div>
        </div>
     );
}
 
export default Letra;