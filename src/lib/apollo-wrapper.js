"use client";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

// window === undefined = que estamos en el navegador
/**
 * @function makeClient ejecuta una funcion de que viene  de Apollo/experiemntal (NextSSRApolloClient)
 */
function makeClient() {
  const httpLink = new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

/**
 * @function ApolloWrapper permite el funcionamiento de la apliacion desde el lado del cliente
 */
export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
