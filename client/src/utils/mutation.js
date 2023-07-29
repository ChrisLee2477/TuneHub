import { gql } from "@apollo/client";

export const ADD_PLAYLIST = gql`
  mutation addplaylist($name: String!, $creator:Schema.Types.ObjectId!, $songs: Schema.Types.ObjectId!) {
    addaddPlaylist(name: $name, creator: $creator, songs: $songs) {
      token
      playlist {
        _id
        name
        creator
        song
      }
    }
  }
`;

export const ADD_SONG = gql`
  mutation addSong(
    $userId: ID!
    $title: String!
    $artist: String!
    $album: String!
    $duration: Number!
  ) {
    addSong(
      userid: $userId
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
  mutation addComment(
    $user: Schema.Types.ObjectId
    $content: String!
    $createdAt: Date!
   
  ) {
    addComment(
      user: $user
      content: $content
      createdAt: $createdAt
    ) {
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
    $duration: Number!
  ) {
    removeSong(
      userid: $userId
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
  mutation addComment(
    $user: Schema.Types.ObjectId
    $content: String!
    $createdAt: Date!
   
  ) {
    addComment(
      user: $user
      content: $content
      createdAt: $createdAt
    ) {
      _id
      user
      content
      createdAt
    }
  }
`;
