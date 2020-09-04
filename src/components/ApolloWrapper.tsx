import React, { useEffect, useState } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { useAuth0 } from '@auth0/auth0-react';
import { split, from } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { useRecoilState } from 'recoil';
import { recoilForceUpdateState } from '../atom.js';

const ApolloWrapper: any = ({ children }: any) => {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();

  console.log('isAuthenticated', isAuthenticated);

  let token = localStorage.getItem('token');

  if (!token) {
    const getAccessToken = async () => {
      // getTokenSilently() returns a promise
      try {
        token = await getAccessTokenSilently();
        localStorage.setItem('token', token);
      } catch (e) {
        console.log(e);
      }
    };
    getAccessToken();
  }

  console.log('ApolloWrapper');

  const httpLink = new HttpLink({
    uri: 'http://localhost:8080/v1/graphql',
  });

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:8080/v1/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    },
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  /* Set up local cache */
  const cache = new InMemoryCache();

  interface Definintion {
    kind: string;
    operation?: string;
  }

  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation }: Definintion = getMainDefinition(query);
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

  // const persistCacheWrapper = async () => {
  //   /* Create persistor to handle persisting data from local storage on refresh, etc */
  //   await persistCache({
  //     cache,
  //     storage: window.localStorage as PersistentStorage<
  //       PersistedData<NormalizedCacheObject>
  //     >,
  //   });
  // };

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
