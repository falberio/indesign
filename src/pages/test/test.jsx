import React from 'react'
import './test.scss'; 

const Test = () => {

    const showInfo = (e) => {
        console.log(e);
    }

    return ( 
        <div className="wrapper">

            <svg
                viewBox="0 0 100 100" 
                xmlns="http://www.w3.org/2000/svg"
                className="icon-test"
            >
                <circle cx="50" cy="50" r="50"/>
            </svg>


            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 400 400" space="preserve" className="iconOso">
                
                <g id="bear_ears">
                    <circle id="left_outer_ear" class="st0" cx="125.6" cy="117.6" r="31.4"/>
                    <circle id="right_outer_ear" class="st0" cx="289.6" cy="117.6" r="31.4"/>
                    <circle id="left_inner_ear" class="st1" cx="127.2" cy="119.2" r="15.8"/>
                    <circle id="right_inner_ear" class="st1" cx="285.2" cy="118.2" r="15.8"
                        onClick={showInfo}
                    />
                </g>
                <g id="bear_face">
                    <circle id="face" class="st0" cx="208.2" cy="190.4" r="99"/>
                    <circle id="left_eye" cx="177.5" cy="159.1" r="8.2"/>
                    <circle id="right_eye" cx="238.5" cy="160.1" r="8.2"/>
                </g>
                <g id="bear_snout">
                    <path id="snout" class="st2" d="M263.4,217.4c0,34.4-24.7,62.3-55.1,62.3s-55.1-27.9-55.1-62.3s24.1-43.6,54.5-43.6
                        S263.4,183,263.4,217.4z"/>
                    <ellipse id="nose" class="st1" cx="208.1" cy="205.4" rx="26.4" ry="10.4"/>
                    <path id="mouth" class="st3" d="M243.2,234.2c-20.2,19.2-52,18.4-71.2-1.8"/>
                </g>
            </svg>
        </div>
        
     );
}
 
export default Test;