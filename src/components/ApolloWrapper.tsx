import React from 'react';
import { ApolloProvider, HttpOptions } from '@apollo/react-hooks';
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
import jwt_decode, { JwtPayload } from 'jwt-decode';

interface Definition {
  kind: string;
  operation?: string;
}

export type ApolloHeaders = {
  Authorization: string;
};

export type ApolloWrapperProps = {};

export type ParsedTokenUser = JwtPayload & {
  'https://hasura.io/jwt/claims'?: any;
};

const ApolloWrapper: React.FC<ApolloWrapperProps> = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const getHeaders = async () => {
    const headers = {} as ApolloHeaders;
    if (isAuthenticated) {
      const token: string = await getAccessTokenSilently();
      parseTokenAndSetRoles(token);
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  };

  const parseTokenAndSetRoles = async (token: string) => {
    const user: ParsedTokenUser = jwt_decode<JwtPayload>(token);
    if (user.sub === undefined) return;
    sessionStorage.setItem(
      user.sub,
      user['https://hasura.io/jwt/claims']['x-hasura-allowed-roles'],
    );
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

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
