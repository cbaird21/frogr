const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
    posts: [Post]!
  }

  type Post {
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
    user: [User]
    user(username: String!): User
    post(username: String): [Post]
    thoughts(username: String): [Thought]
    thought(thought: ID!): Thought
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postImage: String!, postText: String): Post
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removePost(postId: ID!): Post
    removeThought(thoughtId: ID!): Thought
    removePostComment(postId: ID!, commentId: ID!): Post
    removeThoughtComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;
