import React, { useState } from "react";
import {
    Container,
    Card,
    Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { removePostId } from "../utils/localStorage";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
// import { REMOVE_POST } from "../utils/mutations";
import { UNLIKE_POST } from "../utils/mutations";
import { savePostIds, getSavedPostIds } from "../utils/localStorage";

const LikedPost = ()  => {
  const { loading, data } = useQuery(GET_ME);
  const [savedPostIds, setSavedPostIds] = useState(getSavedPostIds());
//   const [removePost, { error }] = useMutation(REMOVE_POST);
  const [unlikePost, {error}] = useMutation(UNLIKE_POST);
  const userData = data?.me || {};
  console.log(userData.likedPost);

  // create function that accepts the post's mongo _id value as param and deletes the post from the database
//   const handleDeletePost = async (postId) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const { data } = await removePost({
//         variables: { postId },
//       });

//       removePostId(postId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

  const handleUnlike = async (postId) => {

    try {
      const {data} = await unlikePost({
        variables: { postId: postId },
      });
      removePostId(postId);
      setSavedPostIds([...savedPostIds, postId]);
    } catch (err) {
      console.error(JSON.stringify(err));
    }
    window.location.reload();
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  if (error) {
    return <h2>ERROR... </h2>;
  }

  return (
    <>
      <Container>
        <main>
          <h1>Viewing liked posts!</h1>
          <h2>
            {userData.likedPost.length
              ? `Viewing ${userData.likedPost.length} liked ${
                  userData.likedPost.length === 1 ? "post" : "posts"
                }:`
              : "You have no liked posts!"}
          </h2>
          <div className="grid">
            {userData.likedPost.map((post) => {
              return (
                <Card key={post._id} border="dark" style={{ width: "18rem" }}>
                  <Card.Title>{post.postAuthor}</Card.Title>
                  <Card.Body>
                    {/* if post image exists */}
                    {post.postImage ? (
                      <Card.Img
                        src={post.postImage}
                        alt={"The image for the post"}
                        variant="top"
                      />
                    ) : null}

                    {/* if post text exists */}
                    {post.postText ? (
                      <Card.Text>{post.postText}</Card.Text>
                    ) : null}

                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleUnlike(post._id)}
                    >
                      Unlike this post!
                    </Button>
                  </Card.Body>
                  <Card.Footer>
                    {post.comments.map((comment) => {
                      return (
                        <>
                          <div key={comment._id} className="col-12 mb-3 pb-3">
                            <div className="p-3 bg-dark text-light">
                              <h5 className="card-header">
                                {comment.commentAuthor} commented{" "}
                                <span style={{ fontSize: "0.825rem" }}>
                                  on {comment.createdAt}
                                </span>
                              </h5>
                              <p className="card-body">{comment.commentText}</p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </Card.Footer>
                </Card>
              );
            })}
          </div>
        </main>
      </Container>
    </>
  );
};

export default LikedPost;
