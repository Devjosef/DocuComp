import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { githubConfig } from './config';

class GitHubAPI {
  private client;

  constructor(token: string) {
    this.client = new ApolloClient({
      uri: 'https://api.github.com/graphql',
      cache: new InMemoryCache(),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getRepoIssues(owner: string, repo: string) {
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
      const { data } = await this.client.query({
        query,
        variables: { owner, repo },
        fetchPolicy: 'cache-first',
      });
      return data.repository.issues.edges.map(edge => edge.node);
    } catch (error) {
      console.error('GitHub GraphQL API error:', error);
      throw error;
    }
  }
}

// Ensure that githubConfig.clientSecret is defined before passing it to GitHubAPI constructor
const githubAPIToken = githubConfig.clientSecret as string;
const githubAPI = new GitHubAPI(githubAPIToken);
export default githubAPI;