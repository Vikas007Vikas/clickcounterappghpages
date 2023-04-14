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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncClicks = /* GraphQL */ `
  query SyncClicks(
    $filter: ModelClickFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncClicks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        count
        timestamp
        location
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
