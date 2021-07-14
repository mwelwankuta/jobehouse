import React from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';

import UserContextProvider from './Contexts/UserContext';
import PostsContextProvider from './Contexts/PostsContext';
import ModalViewContextProvider from './Contexts/ModalViewContext';
import RequestContextProvider from './Contexts/RequestsContext';

import AppRouter from './AppRouter';

function App() {

  const client = new ApolloClient({
    uri: "https://jobe-house.herokuapp.com/graphql",
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <UserContextProvider>
        <ModalViewContextProvider>
          <PostsContextProvider>
            <RequestContextProvider>
              <AppRouter />
            </RequestContextProvider>
          </PostsContextProvider>
        </ModalViewContextProvider>
      </UserContextProvider>
    </ApolloProvider>
  );
};

export default App;
