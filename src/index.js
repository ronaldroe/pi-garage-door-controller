import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../public/css/bootstrap.min.css';
import '../public/scss/global.scss';

import {
  Main
} from './views';

const App = () => {
    
  return(
    <Router basename='/'>
      <>
        <Route exact path='/' render={Main} />
      </>
    </Router>
  );

}

render(<App />, document.getElementById("app"));