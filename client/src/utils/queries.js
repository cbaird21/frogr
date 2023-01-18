// This will hold the query GET_ME, which will execute the me query set up using Apollo Server.

import { gql } from '@apollo/client';

// expand query to include all keys returned on object
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
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