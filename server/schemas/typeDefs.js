const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]!
    thoughts: [Thought]!
  }

  type Post {
    _id: ID
    postImage: String
    postText: String
    postAuthor: String
    comments: [Comment]!
    createdAt: String
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    comments: [Comment]!
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
    profile(profileId: ID!): Profile
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    addProfile(name: String!): Profile
    removeProfile(profileId: ID!): Profile
    addUser(username: String!, email: String!, password: String!): Auth
    removeUser(userId: ID!): User
    login(email: String!, password: String!): Auth
    addPost(postImage: String!, postText: String): Post
    removePost(postId: ID!): Post
    addPostComment(postId: ID!, commentText: String!): Post
    removePostComment(postId: ID!, commentId: ID!): Post
    addThought(thoughtText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    addThoughtComment(thoughtId: ID!, commentText: String!): Thought
    removeThoughtComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
