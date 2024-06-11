import { gql } from '@apollo/client';

export const GET_ENTRY = gql`
  query GetEntry($entryId: String!) {
    entry(id: $entryId) {
      sys {
        id
        updatedAt
      }
      title
      content
      version
      status
      lastUpdated
    }
  }
`;

export const GET_DOCUMENTS = gql`
  query GetDocuments {
    documentCollection {
      items {
        sys {
          id
        }
        title
        content
        version
        status
        lastUpdated
      }
    }
  }
`;