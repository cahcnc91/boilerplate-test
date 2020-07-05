import React, {useContext} from "react";
import ReactDOM from "react-dom";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import Routes from "./Routes";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { getAccessToken, setAccessToken } from "./accessToken";
import { StateProvider } from "./store.js";

const cache = new InMemoryCache();

const requestLink = new ApolloLink(
  
  (operation, forward) =>
    new Observable((observer) => {
      let handle;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();

        if (!token) {
          return true;
        }

        try {
          const { exp } = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch("http://localhost:4000/refresh_token", {
          method: "POST",
          credentials: "include",
        });
      },
      handleFetch: (accessToken) => {
        setAccessToken(accessToken);
      },
      handleError: (err) => {
        // full control over handling token fetch Error
        console.warn("Your refresh token is invalid. Try to relogin");
        console.log(err);
      },
    }),
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        //sendToLoggingService(graphQLErrors);
      }
      if (networkError) {
        //logoutUser();
      }
    }),
    requestLink,
    new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
    }),
  ]),
  cache,
  resolvers: {
    Mutation: {
      updateNetworkStatus: (_, { isConnected }, { cache }) => {
        cache.writeData({ data: { isConnected } });
        return null;
      },
    },
  },
});

cache.writeData({
  data: {
    isConnected: true,
  },
});

ReactDOM.render(
  <StateProvider>
    <ApolloHooksProvider client={client}>
      <Routes />
    </ApolloHooksProvider>
  </StateProvider>,
  document.getElementById("root")
);
