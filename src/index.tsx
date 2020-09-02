import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import ApolloWrapper from './components/ApolloWrapper';
import App from './App';

ReactDOM.render(
  <Auth0Provider
    domain="tom-schall.eu.auth0.com"
    clientId="5grQYQ4dnRzUJ8wbP0EfBt5WNCIkQr33"
    redirectUri="https://bcf3bbf21bcd.ngrok.io/general"
    audience="hasura"
  >
    <BrowserRouter>
      <RecoilRoot>
        <ApolloWrapper>
          <App />
        </ApolloWrapper>
      </RecoilRoot>
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root'),
);
