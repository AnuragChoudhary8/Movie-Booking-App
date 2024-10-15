import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux"
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = 'http://127.0.0.1:4000';
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
