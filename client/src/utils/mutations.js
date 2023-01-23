import { gql } from "@apollo/client";

// ADD_USER will execute the addUser mutation.
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
// LOGIN will execute the login mutation set up using Apollo Server.
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// ADD_POST will execute the addPost mutation.
export const ADD_POST = gql`
  mutation addPost($postImage: String, $postText: String) {
    addPost(postImage: $postImage, postText: $postText) {
      postImage
      postText
      postAuthor
    }
  }
`;

// REMOVE_POST will execute the removePost mutation.
export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId ) {
      _id
      postAuthor
    }
  }
`;

// ADD_COMMENT will execute the addThought mutation
export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      comments {
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;


// REMOVE_POST_COMMENT will execute the removePostComment mutation
export const REMOVE_COMMENT = gql`
  mutation removeComment($postId: ID!, $commentId: ID!) {
    removeComment(postId: $postId, commentId: $commentId) {
      comments {
        _id
        commentText
        commentAuthor
      }
    }
  }
`;

// LIKED_POST will execute the likePost mutation.
export const LIKED_POST = gql`
  mutation likedPost($postId:ID!) {
    likedPost(postId: $postId) {
      _id
      postImage
      postText
      postAuthor
    }
  }
`;

// LIKED_POST will execute the likePost mutation.
export const UNLIKE_POST = gql`
  mutation unlikePost($postId:ID!) {
    unlikePost(postId: $postId) {
      _id
      postImage
      postText
      postAuthor
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!) {
    addProfile(name: $name) {
      _id
      name
      skills
    }
  }
`;