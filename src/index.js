import React from 'react';
import ReactDOM from 'react-dom/client';
import RouteSwitch from './RouteSwitch';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './css/style.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <RouteSwitch />
    </Router>
</React.StrictMode>
);
