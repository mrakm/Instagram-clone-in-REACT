import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { firebase, fieldValue } from './lib/firebase';
import FirebaseContext from './context/firebase';



ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, fieldValue }}>
    <App />
    </FirebaseContext.Provider>,
  document.getElementById('root')
);
