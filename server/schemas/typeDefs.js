const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    
  }
 
  type Song  {
    _id: String
    title: String
    artist: String
    album: String
    duration: Int
  }

  type Playlist  {
    _id: String
    name: String
    creator: User
    songs: [Song]!
  }

  type Comment {
    _id: ID
    user: User
    content: String
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }
  type Query {
  getUserById(_id: ID!): User
  getAllSongs: [Song]!
  getPlaylistById(id: ID!): Playlist
 
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): User
  createSong(title: String!, artist: String!, album: String!, duration: Int!): Song
  createPlaylist(name: String!, creatorId: ID!): Playlist
  addSongToPlaylist(playlistId: ID!, songId: ID!): Playlist
  postComment(playlistId: ID!, userId: ID!, content: String!): Comment
 
}
  `;

module.exports = typeDefs;
