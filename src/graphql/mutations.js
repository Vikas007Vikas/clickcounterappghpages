/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClick = /* GraphQL */ `
  mutation CreateClick(
    $input: CreateClickInput!
    $condition: ModelClickConditionInput
  ) {
    createClick(input: $input, condition: $condition) {
      id
      count
      timestamp
      location
      createdAt
      updatedAt
    }
  }
`;
export const updateClick = /* GraphQL */ `
  mutation UpdateClick(
    $input: UpdateClickInput!
    $condition: ModelClickConditionInput
  ) {
    updateClick(input: $input, condition: $condition) {
      id
      count
      timestamp
      location
      createdAt
      updatedAt
    }
  }
`;
export const deleteClick = /* GraphQL */ `
  mutation DeleteClick(
    $input: DeleteClickInput!
    $condition: ModelClickConditionInput
  ) {
    deleteClick(input: $input, condition: $condition) {
      id
      count
      timestamp
      location
      createdAt
      updatedAt
    }
  }
`;
