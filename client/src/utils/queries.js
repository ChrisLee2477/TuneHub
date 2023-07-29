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

// Query to get all songs
export const QUERY_ALL_SONGS = gql`
  query getAllSongs {
    getAllSongs {
      _id
      title
      artist
      album
      duration
    }
  }
`;

// Query to get a playlist by ID
export const QUERY_PLAYLIST_BY_ID = gql`
  query getPlaylistById($id: ID!) {
    getPlaylistById(id: $id) {
      _id
      name
      creator {
        _id
        username
      }
      songs {
        _id
        title
        artist
        album
        duration
      }
    }
  }
`;
