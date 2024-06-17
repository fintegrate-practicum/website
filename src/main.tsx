import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';

const rootElement = document.getElementById('root') as HTMLElement;
// const rootElement = document.getElementById('root');

const auth0_domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0_client_id = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0_audience = import.meta.env.VITE_AUTH0_AUDIENCE;

if (rootElement) {
  // const root = ReactDOM.createRoot(rootElement);
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
  console.error("Root element with id 'root' not found in the document.");
}