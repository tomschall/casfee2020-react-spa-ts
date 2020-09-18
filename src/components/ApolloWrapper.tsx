import React from 'react';
import {
  ApolloProvider as ApolloHooksProvider,
  HttpOptions,
} from '@apollo/react-hooks';
import { getMainDefinition } from 'apollo-utilities';
import { useAuth0 } from '@auth0/auth0-react';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import { WebSocketLink, WebSocketParams } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';

interface Definition {
  kind: string;
  operation?: string;
}

export type ApolloHeadersType = {
  Authorization: string;
};

const ApolloWrapper: React.FC<any> = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const getHeaders = async () => {
    const headers = {} as ApolloHeadersType;
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      //console.log('token', token);
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  };

  const authMiddleware = setContext(async (operation, { originalHeaders }) => {
    return {
      headers: {
        ...originalHeaders,
        ...(await getHeaders()),
      },
    };
  });

  const httpLinkOptions: HttpOptions = {
    uri: process.env.REACT_APP_HTTP_BACKEND_LINK,
  };

  const wsLinkOptions: WebSocketParams = {
    uri: process.env.REACT_APP_WS_BACKEND_LINK || '',
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: async () => {
        return { headers: await getHeaders() };
      },
    },
  };

  const httpLink = createHttpLink(httpLinkOptions);
  const wsLink = new WebSocketLink(wsLinkOptions);

  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation }: Definition = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    authMiddleware.concat(httpLink),
  );

  /* Set up local cache */
  const cache = new InMemoryCache();

  /* Create Apollo Client */
  const client = new ApolloClient({ link, cache });

  return <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>;
};

export default ApolloWrapper;
