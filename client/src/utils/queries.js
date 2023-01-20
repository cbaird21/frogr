// This will hold the query GET_ME, which will execute the me query set up using Apollo Server.

import { gql } from '@apollo/client';

// expand query to include all keys returned on object
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      userPic
      likedPost {
        postId
        postAuthor
        postText
        postImage
        createdAT
      }
      posts{
        postId
        postAuthor
        postText
        postImage
        createdAt
      }
      
    }
  }
`;

export const GET_POST = gql`

  query posts{
    posts {
      _id
      postAuthor
      postText
      postImage
      createdAt
      comments{
        commentText
        commentAuthor
        createdAt
      }
      likedPost{
        postId
        postAuthors
        postText
        postImage
        createdAT
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query getSinglePost($postId: ID!){
    post(postID: $postId){
      _id
      authors
      description
      title
      image
      link
    }
  }
`