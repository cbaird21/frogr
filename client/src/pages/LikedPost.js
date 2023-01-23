import React from "react";
import {
  Container,
  Card,
  Button,
} from "react-bootstrap";
import Postform from '../components/postForm/index'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Accordion from "react-bootstrap/Accordion";
import Commentform from "../components/commentForm/index";
import { useState } from "react";
// import Auth from "../utils/auth";
import { removePostId } from "../utils/localStorage";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
// import { REMOVE_POST } from "../utils/mutations";
import { UNLIKE_POST } from "../utils/mutations";
import { savePostIds, getSavedPostIds } from "../utils/localStorage";

const LikedPost = () => {
  const { loading, data } = useQuery(GET_ME);
  const [savedPostIds, setSavedPostIds] = useState(getSavedPostIds());
  //   const [removePost, { error }] = useMutation(REMOVE_POST);
  const [unlikePost, { error }] = useMutation(UNLIKE_POST);
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
      const { data } = await unlikePost({
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
      <Container fluid className="row vh-100 ms-auto mb-2">

        <main className="customScrollBar grey col-9 border d-inline-block rounded overflow-scroll h-100">
          <h2>
            {userData.likedPost.length
              ? `You have ${userData.likedPost.length} liked ${userData.likedPost.length === 1 ? "post" : "posts"
              }:`
              : "You have no liked posts!"}
          </h2>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry>
              {userData.likedPost.map((post) => {
                return (
                  <Card key={post._id} className="m-3 lightergrey" style={{ width: "18rem" }}>
                    <Card.Header className="lightergrey" ><h3>{post.postAuthor}</h3></Card.Header>
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
                        className="btn-block btn-danger mt-2"
                        onClick={() => handleUnlike(post._id)}
                      >
                        Unlike this post!
                      </Button>
                      <small className="d-block text-muted ml-2">
                        created at: {post.createdAt}
                      </small>
                    </Card.Body>
                    <Card.Footer>
                      <Accordion defaultActiveKey="null" flush>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header className="width-15">
                            Comment
                          </Accordion.Header>
                          <Accordion.Body>
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
                            <Commentform postId={post._id} />
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Card.Footer>
                  </Card>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </main>
        <aside className="col-3">
          <Card className="w-100 h-100  d-inline-block lightergrey">
            <Card.Header className="p-4 m-0  border-bottom grey">
              {userData.userPic ? (<Card.Img className="p-2" cldImg={userData.userPic}></Card.Img>) : ""}
              <h2 className="p-2 d-inline">{userData.username}</h2>
              <p className="p-2">{`${userData.posts.length}`} Posts </p>
            </Card.Header>
            <Card.Body>
              <Postform />
            </Card.Body>
          </Card>
        </aside>
      </Container>
    </>
  );
};

export default LikedPost;
