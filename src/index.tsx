import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import { Provider } from 'react-redux';
import axios from 'axios';
import './index.css';
import App from './App';
import "./i18n/config"
import store from './redux/store'

axios.defaults.headers["x-icode"] = "J29B68B309A8D9A16";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

