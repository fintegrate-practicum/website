
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
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';


const rootElement = document.getElementById('root') as HTMLElement;

const auth0_domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0_client_id = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0_audience = import.meta.env.VITE_AUTH0_AUDIENCE;

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Auth0Provider domain={auth0_domain} clientId={auth0_client_id} authorizationParams={{
        redirect_uri: window.location.origin,
        audience: auth0_audience,
        scope: "read:current_user update:current_user_metadata"
      }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Auth0Provider>
    </React.StrictMode>
  );
} else {
  console.error("Root element with id 'root' not found.");
}