import React from 'react';
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

const domain: string = process.env.REACT_APP_AUTH0_DOMAIN || '';
const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
const redirectUri: string = window.location.origin;
const audience: string = process.env.REACT_APP_AUTH0_AUDIENCE || '';

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={redirectUri}
    onRedirectCallback={onRedirectCallback}
    audience={audience}
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
