import { ApolloClient, InMemoryCache, HttpLink,} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const httpLink = new HttpLink({
  uri: 'https://graphql.contentful.com/content/v1/spaces/{SPACE_ID}',
  headers: {
    Authorization: `Bearer {ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          entries: {
            merge(existing, incoming) {
              return {...existing, ...incoming};
            },
          },
        },
      },
    },
  }),
});

export default client;