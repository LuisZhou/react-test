import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Timer from './Timer';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

ReactDOM.render(
    <Timer />,
    document.getElementById('timer')
);


