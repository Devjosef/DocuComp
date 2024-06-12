import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { githubConfig } from './config';

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${githubConfig.token}`,
    },
});

export const getRepoIssues = async (owner: string, repo: string) => {
    const query = gql`
        query GetRepoIssues($owner: String!, $repo: String!) {
            repository(owner: $owner, name: $repo) {
                issues(last: 10, states: OPEN) {
                    edges {
                        node {
                            title
                            url
                            labels(first: 5) {
                                edges {
                                    node {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const { data } = await client.query({
            query,
            variables: { owner, repo },
            fetchPolicy: 'cache-first', // Use cache first, fetch from network if not available
        });
        return data.repository.issues.edges.map(edge => edge.node);
    } catch (error) {
        console.error('GitHub GraphQL API error: ', error);
    }
};