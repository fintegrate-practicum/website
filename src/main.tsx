
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';


const rootElement = document.getElementById('root');

if (rootElement) {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>,
        rootElement
    );
} else {
    console.error("Root element with id 'root' not found in the document.");
}
