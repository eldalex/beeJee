import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from "redux";
import reducer from "./reducer";
import {Provider} from "react-redux";
import App from './components/app/App'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'

export const API_URL = "http://79.133.182.118:5000"

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);