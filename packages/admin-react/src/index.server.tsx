import React from 'react';
import {StaticRouter} from "react-router-dom/server";
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';

export default function createApp(url: string) {
  return () => <StaticRouter basename={"admin-react"} location={url}>
    <App/>
  </StaticRouter>
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
