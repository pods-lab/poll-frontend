import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './main/AppComponent';
import 'normalizer';
import './css/tailwind.css';
document.title = process.env.REACT_APP_NAME;
ReactDOM.render(<AppComponent />, document.getElementById('root'));
