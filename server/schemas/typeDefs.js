const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    userPic: String
    likedPost: [Post]
    posts: [Post]
  }

  type Post {
    _id: ID
    postImage: String
    postText: String
    postAuthor: String
    comments: [Comment]
    likedBy: [User]
    createdAt: String
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    posts(postAuthor: String): [Post]
    post(postId: ID!): Post
    me: User
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      userPic: String
    ): Auth
    editUser(username: String, email: String, password: String): Auth
    likedPost(postId: ID!): Post
    unlikePost(postId: ID!): Post
    removeUser(userId: ID!): Auth
    login(email: String!, password: String!): Auth
    addPost(postImage: String, postText: String): Post
    removePost(postId: ID!): Post
    addComment(postId: ID!, commentText: String!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;
// saveLike(newLike: likedPost!): User

//   input likedPosts {
//   _id: String
//   postImage: String
//   postText: String
//   postAuthor: String
//   comments: [Comment]
//   likedPost: [User]
//   createdAt: String
// }
