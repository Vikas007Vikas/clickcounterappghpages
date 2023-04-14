/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClick = /* GraphQL */ `
  query GetClick($id: ID!) {
    getClick(id: $id) {
      id
      count
      timestamp
      location
      createdAt
      updatedAt
    }
  }
`;
export const listClicks = /* GraphQL */ `
  query ListClicks(
    $filter: ModelClickFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClicks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        count
        timestamp
        location
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
