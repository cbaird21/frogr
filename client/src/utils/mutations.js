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
  mutation addPost($postImage: String!, $postText: String) {
    addPost(postImage: $postImage, postText: $postText ) {
      _id
      username
      addPost {
      postImage
      postText
      postAuthor
      }
    }
  }
`;

// ADD_THOUGHT will execute the addThought mutation.
export const ADD_THOUGHT = gql`
  mutation addThought( $thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      username 
      addThought {
        thoughtText
        thoughtAuthor
      }
    }
  }
  `

// ADD_POST_COMMENT will execute the addThought mutation
export const ADD_POST_COMMENT = gql`
  mutation addPostComment($postId: ID!, $commentText: String!){
    addPostComment( _id: $postId, commentText: $commentText) {
      _id
      username 
      addPostComment {
        commentText
        commentAuthor
      }
    }
  }
  `

// ADD_THOUGHT_COMMENT will execute the addThought mutation
export const ADD_THOUGHT_COMMENT = gql`
  mutation addThoughtComment($thoughtId: ID!, $commentText: String!){
    addThoughtComment( _id: $thoughtId, commentText: $commentText) {
      _id
      username 
      addThoughtComment {
        commentText
        commentAuthor
      }
    }
  }
  `

// REMOVE_POST will execute the removePost mutation.
export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
      username
      removePost {
      postImage
      postText
      postAuthor
      }
    }
  }
`;

// REMOVE_THOUGHT will execute the removeThought mutation.
export const REMOVE_THOUGHT = gql`
  mutation removeThought($thoughtId: ID!) {
    removeThought(thoughtId: $thoughtId) {
      _id
      username
      thought {
        thoughtId
        thoughtAuthor
      }
    }
  }
`;

// REMOVE_POST_COMMENT will execute the removePostComment mutation
export const REMOVE_POST_COMMENT = gql`
  mutation removePostComment($postId: ID!, $commentId: ID!) {
    removePostComment(_id: $postId, _id: $commentId){
      _id
      removePostComment{
        commentText
        commentAuthor
      }
    }
  }
`

// REMOVE_THOUGHT_COMMENT will execute the removeThoughtComment mutation
export const REMOVE_THOUGHT_COMMENT = gql`
  mutation removeThoughtComment($thoughtId: ID!, $commentId: ID!) {
    removeThoughtComment(_id: $thoughtId, _id: $commentId){
      _id
      removeThoughtComment{
        commentText
        commentAuthor
      }
    }
  }
`

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
`