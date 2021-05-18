import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {routersUser,routersAdmin} from './router/routers';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

ReactDOM.render(
  
    <BrowserRouter>
        {renderRoutes(routersUser)}
        {renderRoutes(routersAdmin)}
    </BrowserRouter>,
  
  document.getElementById('root') as HTMLElement
);
