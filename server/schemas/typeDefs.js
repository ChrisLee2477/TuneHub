const typeDefs = `
  type User {
    _id: ID
    name: String
    email: String
    password: String
    comments: [String]!
  }


  type Comment {
    _id: ID!
    user: User!
    content: String!
    createdAt: String!
  }

 type Auth {
    token: String!
    profile: User!
  }
  type Query {
    users: [User]
    user(username: String!): User
    comments(username: String!): [Comment] 
    comment(_id: ID!): Comment
  }

type Mutation {
  createUser(name: String!, email: String!, password: String!): Auth
  login(username: String!, password: String!): Auth! 
  postComment(userId: ID!, content: String!): Comment
  
}
  `;

module.exports = typeDefs;
