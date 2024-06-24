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

export interface Entry {
  sys: {
    id: string;
    updatedAt: string;
  };
  title: string;
  content: string;
  version: number;
  status: string;
  lastUpdated: string;
}

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