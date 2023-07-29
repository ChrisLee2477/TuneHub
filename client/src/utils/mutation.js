import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation signupUser($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
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
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        name
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
