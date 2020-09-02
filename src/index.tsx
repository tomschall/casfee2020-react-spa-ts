import React, { useState } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { CachePersistor } from 'apollo-cache-persist';
import createAuth0Client from '@auth0/auth0-spa-js';

import App from './App';
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types';

const createApolloClient = (authToken: any) => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: 'ws://localhost:8080/v1/graphql',
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      },
    }),
    cache: new InMemoryCache(),
  });
};

// const httpLink = new HttpLink({
//   uri: 'http://localhost:8080/v1/graphql',
// });

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:8080/v1/graphql`,
//   options: {
//     reconnect: true,
//   },
// });

// const terminatingLink = split(
//   ({ query }) => {
//     let definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );

// const link = ApolloLink.from([terminatingLink]);

// const cache = new InMemoryCache();

// const client = new ApolloClient({
//   link,
//   cache,
// });

// console.log(window.location.origin);

// ReactDOM.render(
//   <Auth0Provider
//     domain="tom-schall.eu.auth0.com"
//     clientId="5grQYQ4dnRzUJ8wbP0EfBt5WNCIkQr33"
//     redirectUri="https://3c9c3bec31e0.ngrok.io"
//   >
//     <BrowserRouter>
//       <RecoilRoot>
//         <ApolloProvider client={client}>
//           <App />
//         </ApolloProvider>
//       </RecoilRoot>
//     </BrowserRouter>
//   </Auth0Provider>,
//   document.getElementById('root'),
// );

createAuth0Client({
  domain: 'tom-schall.eu.auth0.com',
  client_id: '5grQYQ4dnRzUJ8wbP0EfBt5WNCIkQr33',
  redirect_uri: 'https://bcf3bbf21bcd.ngrok.io/general',
  audience: 'hasura',
}).then((auth0) => {
  const auth0Client = auth0;

  console.log('auth0Client', auth0Client);

  /* Set in-memory token to reduce async requests */
  let token: any;

  /* Create Apollo Link to supply token with either
   * in-memory ref or auth0 req'ed token or redirect (built into
   * getTokenSilently
   */
  const withTokenLink = setContext(async () => {
    // return token if there
    if (token) return { auth0Token: token };

    // else check if valid token exists with client already and set if so
    const newToken = await auth0Client.getTokenSilently({
      sso: false,
    });
    token = newToken;
    localStorage.setItem('token', token);

    console.log('auth0Token', newToken);
    return { auth0Token: newToken };
  });

  /* Set URI for all Apollo GraphQL requests (backend api) */
  const httpLink = new HttpLink({
    uri: 'http://localhost:8080/v1/graphql',
  });

  // const wsLink = new WebSocketLink({
  //   uri: `ws://localhost:8080/v1/graphql`,
  //   options: {
  //     reconnect: true,
  //     connectionParams: {
  //       authToken: localStorage.getItem('token'),
  //     },
  //   },
  // });

  console.log('localstorage', localStorage.getItem('token'));

  /* Create Apollo Link to supply token in auth header with every gql request */
  const authLink = setContext((_, { headers, auth0Token }) => ({
    headers: {
      ...headers,
      ...(auth0Token ? { Authorization: `Bearer ${auth0Token}` } : {}),
    },
  }));

  // const terminatingLink = split(
  //   ({ query }) => {
  //     let definition = getMainDefinition(query);
  //     return (
  //       definition.kind === 'OperationDefinition' &&
  //       definition.operation === 'subscription'
  //     );
  //   },
  //   wsLink,
  //   httpLink,
  // );

  /* Create Apollo Link array to pass to Apollo Client */
  const link = ApolloLink.from([withTokenLink, authLink, httpLink]);

  console.log('link', link);

  /* Set up local cache */
  const cache = new InMemoryCache();

  /* Create Apollo Client */
  const client = new ApolloClient({
    link,
    cache,
  });

  /* Create persistor to handle persisting data from local storage on refresh, etc */
  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage as PersistentStorage<
      PersistedData<NormalizedCacheObject>
    >,
  });

  /* Create root render function */
  const renderApp = (Component: any) => {
    const client = createApolloClient(localStorage.getItem('token'));
    render(
      <Auth0Provider
        domain="tom-schall.eu.auth0.com"
        clientId="5grQYQ4dnRzUJ8wbP0EfBt5WNCIkQr33"
        redirectUri="https://bcf3bbf21bcd.ngrok.io/general"
        auth0Client={auth0Client}
        audience="hasura"
      >
        <BrowserRouter>
          <RecoilRoot>
            <ApolloProvider client={client}>
              <Component />
            </ApolloProvider>
          </RecoilRoot>
        </BrowserRouter>
      </Auth0Provider>,
      document.getElementById('root'),
    );
  };

  /* Render React App after hydrating from local storage */
  persistor.restore().then(() => {
    renderApp(App);
  });
});
