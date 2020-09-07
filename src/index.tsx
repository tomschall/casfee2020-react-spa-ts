import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import ApolloWrapper from './components/ApolloWrapper';
import App from './App';

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState: any) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

ReactDOM.render(
  <Auth0Provider
    domain="dev-tb804vtm.eu.auth0.com"
    clientId="58LyjIYXezRMmqC8LV5UHaCO5wNhqOoP"
    redirectUri="http://localhost:3000/channel/general"
    onRedirectCallback={onRedirectCallback}
    audience="hasura"
  >
    <BrowserRouter>
      <RecoilRoot>
        <ApolloWrapper>
          <React.Fragment>
            <App />
          </React.Fragment>
        </ApolloWrapper>
      </RecoilRoot>
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root'),
);
