import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';

function Home() {



  return (
    <Fragment>
      <h1>HOME</h1>
      <ul>
        <li><Link to={'/'}>Inicio</Link></li>
        <li><Link to={'/crear-texto'}>Creat Texto</Link></li>
        <li><Link to={'/create-flag'}>Crear bandera</Link></li>
        <li><Link to={'/test'}>Test</Link></li>
      </ul>
    </Fragment>
  );
}

export default Home;
