import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Timer from './Timer';
import './index.css';
import Greeting from './Conditional-rendering'

ReactDOM.render(
  <Greeting isLoggedIn={true} />,
  document.getElementById('root')
);

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

// ReactDOM.render(
//     <Timer />,
//     document.getElementById('timer')
// );


