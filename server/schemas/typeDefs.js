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
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    comments: [Comment]!
  }
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
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
    post(post: ID!): Post
    thoughts(username: String): [Thought]
    thought(thought: ID!): Thought
    me: User
  }

  type Mutation {
    addProfile(name: String!): Profile
    removeProfile(profileId: ID!): Profile
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postImage: String!, postText: String): Post
    addThought(thoughtText: String!): Thought
    addPostComment(postId: ID!, commentText: String!): Post
    addThoughtComment(thoughtId: ID!, commentText: String!): Thought
    removePost(postId: ID!): Post
    removeThought(thoughtId: ID!): Thought
    removePostComment(postId: ID!, commentId: ID!): Post
    removeThoughtComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
