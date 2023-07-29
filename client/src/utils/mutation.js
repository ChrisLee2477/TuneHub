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
export const ADD_PLAYLIST = gql`
  mutation addPlaylist($name: String!, $creator: String!, $songs: String!) {
    addPlaylist(name: $name, creator: $creator, songs: $songs) {
      _id
      name
      creator
      song
    }
  }
`;

export const ADD_SONG = gql`
  mutation addSong(
    $userId: ID!
    $title: String!
    $artist: String!
    $album: String!
    $duration: Int!
  ) {
    addSong(
      userId: $userId
      title: $title
      artist: $artist
      album: $album
      duration: $duration
    ) {
      _id
      userId
      title
      artist
      album
      duration
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
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_SONG = gql`
  mutation removeSong(
    $userId: ID!
    $title: String!
    $artist: String!
    $album: String!
    $duration: Int!
  ) {
    removeSong(
      userId: $userId
      title: $title
      artist: $artist
      album: $album
      duration: $duration
    ) {
      _id
      userId
      title
      artist
      album
      duration
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
