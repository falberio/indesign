import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import CreateFlag from './pages/create-flag/create-flag';
import CrearTexto from './pages/crear-texto/crear-texto';
import Test from './pages/test/test';

import ColorState from './pages/create-flag/context/color/colorState';
import PartState from './pages/create-flag/context/part/partState';
import FormatState from './pages/create-flag/context/format/formatState';
import ModalState from './pages/create-flag/context/modal/modalState';


function App() {

  return (
    <ColorState>
      <PartState>
        <FormatState>
          <ModalState>
            <Router>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/crear-texto" component={CrearTexto} />
                    <Route exact path="/create-flag" component={CreateFlag} />
                    <Route exact path="/test" component={Test} />
                  </Switch>
            </Router>
          </ModalState>
        </FormatState>
      </PartState>
    </ColorState>

  );
}

export default App;
