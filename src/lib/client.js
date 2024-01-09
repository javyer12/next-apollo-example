import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

/**
 * @param {function} getClient retorna una clase con los datos del cache,y el uri
 */
// para ejemplo de practica: la URL de la serie Rick and Morty
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://rickandmortyapi.com/graphql",
    }),
  });
});
