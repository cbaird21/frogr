import { gql } from "@apollo/client";

// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
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
// ADD_USER will execute the addUser mutation.
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        likedPost {
          authors
          bookId
          image
          link
          title
          description
        }
      }
    }
  }
`;

// LIKED_POST will execute the likePost mutation.
export const LIKED_POST = gql`
  mutation likedPost($likedPost: PostData!) {
    likedPost(likedPost: $likedPost) {
      _id
      username
      likedPost {
        postId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

// ADD_POST will execute the addPost mutation.
export const ADD_POST = gql`
  mutation addPost($postId: ID!) {
    addPost(postId: $postId) {
      _id
      username
      addPost {
        postId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

// REMOVE_POST will execute the removePost mutation.
export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
      username
      likedPost {
        postId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

