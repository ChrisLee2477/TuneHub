import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($user: String, $content: String!, $createdAt: String!) {
    addComment(user: $user, content: $content, createdAt: $createdAt) {
      _id
      user
      content
      createdAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($commentId: ID!) {
    removeComment(commentId: $commentId) {
      _id
      user
      content
      createdAt
    }
  }
`;
