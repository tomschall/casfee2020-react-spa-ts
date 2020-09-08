import React, { useEffect } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { useAuth0 } from '@auth0/auth0-react';
import { useRecoilState } from 'recoil';
import { atomTokenState } from '../atom.js';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const ApolloWrapper: React.FC<any> = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [bearerToken, setBearerToken] = useRecoilState<any>(atomTokenState);

  useEffect(() => {
    console.log('useEffect');
    const getToken = async () => {
      if (isAuthenticated) {
        let token = await getAccessTokenSilently();
        console.log('set bearer token', token);
        setBearerToken(token);
      }
    };
    getToken();
  }, [isAuthenticated, getAccessTokenSilently, setBearerToken]);

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_HTTP_BACKEND_LINK,
  });

  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_WS_BACKEND_LINK || '',
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      },
    },
  });

  const authLink = setContext((_, { headers, ...rest }) => {
    if (!bearerToken) return { headers: { ...headers } };
    //console.log('bearerToken', bearerToken);
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${bearerToken}`,
      },
    };
  });

  /* Set up local cache */
  const cache = new InMemoryCache();

  console.log('authLink', authLink);

  interface Definition {
    kind: string;
    operation?: string;
  }

  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation }: Definition = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink),
  );

  /* Create Apollo Client */
  const client = new ApolloClient({
    link,
    cache,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
