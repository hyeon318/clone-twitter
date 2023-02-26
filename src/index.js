import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './components/App';
import firebase from './fbase'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // strictmode는 side effect를 줄이기 위해 일부러 두번씩 실행시킨다고 하네요. 그래서 dev환경에서만 두번씩 호출되고 production에서는 무시된다고 합니다.
  // <React.StrictMode>
    <App/>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals