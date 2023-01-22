import React, { useState } from "react";
import {
    Container,
    Card,
    Button,
} from "react-bootstrap";
import Auth from "../utils/auth";
import { removePostId } from "../utils/localStorage";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_POST, LIKED_POST, UNLIKE_POST } from "../utils/mutations";

const LikedPost = ()  => {
    const [post, setPost] = useState({});
    const [liked, setLikedPost] = useState(false);

    const { loading, data, } = useQuery(GET_ME);
    const [removePost, { error }] = useMutation(REMOVE_POST);
    const [likedPost, {error}] = useMutation(LIKED_POST)
    const userData = data?.me || {};
    console.log(userData.likedPost);


    // create function that accepts the post's mongo _id value as param and deletes the post from the database
    const handleLike = async (postId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (liked) {
            // remove the like
            const updatedPost = await unlikePost(postId)
            setPost(updatedPost);
        } else {
            // add the like
            const updatedPost = await likedPost(postId);
            setPost(updatedPost);
        }
        setLikedPost(!liked)

        try {
            const { data } = await removePost({
                variables: { postId },
            });

            removePostId(postId);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <h2>LOADING...</h2>;
    }
    if (error) {
        return <h2>ERROR... </h2>
    }

    return (
        <>
        <Container>
            <main>
                <h1>Viewing liked posts!</h1>
                <h2>
                    {userData.likedPost.length
                        ? `Viewing ${userData.likedPost.length} liked ${userData.likedPost.length === 1 ? "post" : "posts"
                        }:`
                        : "You have no liked posts!"}
                </h2>
                <div class="grid">
                    {userData.likedPost.map((post) => {
                        return (
                            <Card key={post.postId} border="dark">
                                <Card.Title>{post.postAuthor}</Card.Title>
                                <Card.Body>

                                    {/* if post image exists */}
                                    {post.postImage ? (
                                    <Card.Img
                                        src={post.postImage}
                                        alt={'The image for the post'}
                                        variant="top"
                                    />
                                    ) : null}

                                    {/* if post text exists */}
                                    {post.postText ? (
                                        <Card.Text>{post.description}</Card.Text>
                                    ) : null }
                                    
                                    
                                    <Button
                                        className="btn-block btn-danger"
                                        onClick={handleLike}
                                    >
                                        {liked ? "Unlike" : "Like"}
                                    </Button>
                                </Card.Body>
                                <Card.Footer>
                                    {post.comments.map((comment) => {
                                        return(
                                            <>
                                            <div key={comment._id} className="col-12 mb-3 pb-3">
                                                <div className="p-3 bg-dark text-light">
                                                    <h5 className="card-header">
                                                        {comment.commentAuthor} commented{' '}
                                                        <span style={{ fontSize: '0.825rem' }}>
                                                            on {comment.createdAt}
                                                        </span>
                                                    </h5>
                                                    <p className="card-body">{comment.commentText}</p>
                                                </div>
                                            </div>
                                            </>
                                        )
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
