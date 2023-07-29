import { gql } from "@apollo/client";

// Query to get a user by ID
export const QUERY_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      _id
      username
      email
    }
  }
`;
