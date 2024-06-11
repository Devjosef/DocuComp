import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://graphql.contentful.com/content/v1/spaces/{SPACE_ID}',
  headers: {
    Authorization: `Bearer {ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;