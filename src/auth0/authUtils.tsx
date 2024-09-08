import { createAuth0Client } from '@auth0/auth0-spa-js';

const auth0_domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0_client_id = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0_audience = import.meta.env.VITE_AUTH0_AUDIENCE;

const getAuth0Client = () => {
  return new Promise((resolve, reject) => {
    let client;
    if (!client) {
      try {
        client = createAuth0Client({
          domain: auth0_domain,
          clientId: auth0_client_id,
          authorizationParams: {
            redirect_uri: window.location.origin,
            audience: auth0_audience,
            scope: 'read:current_user update:current_user_metadata',
          },
        });
        resolve(client);
      } catch (e) {
        console.log(e);
        reject(new Error('getAuth0Client Error'));
      }
    }
  });
};

export const getTokenSilently = async (...p: any[]) => {
  const client: any = await getAuth0Client();
  return await client.getTokenSilently(...p);
};
