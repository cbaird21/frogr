import React from "react";
import {
    Jumbotron,
    Container,
    CardColumns,
    Card,
    Button,
} from "react-bootstrap";
import Auth from "../utils/auth";
import { removePostId } from "../utils/localStorage";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_POST } from "../utils/mutations";

const LikedPost = () => {
    const { loading, data } = useQuery(GET_ME);
    const [removePost, { error }] = useMutation(REMOVE_POST);
    const userData = data?.me || {};

    // create function that accepts the post's mongo _id value as param and deletes the post from the database
    const handleDeletePost = async (postId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

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

    return (
        <>
            <div fluid className="text-light bg-dark">
                <Container>
                    <h1>Viewing saved posts!</h1>
                </Container>
            </div>
            <Container>
                <h2>
                    {userData.LikedPost.length
                        ? `Viewing ${userData.LikedPost.length} saved ${userData.LikedPost.length === 1 ? "post" : "posts"
                        }:`
                        : "You have no liked posts!"}
                </h2>
                <div class="grid">
                    {userData.LikedPost.map((post) => {
                        return (
                            <Card key={post.postId} border="dark">
                                {post.image ? (
                                    <Card.Img
                                        src={post.image}
                                        alt={`The cover for ${post.title}`}
                                        variant="top"
                                    />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <p className="small">Authors: {post.authors}</p>
                                    <Card.Text>{post.description}</Card.Text>
                                    <Button
                                        className="btn-block btn-danger"
                                        onClick={() => handleDeletePost(post.postId)}
                                    >
                                        Delete this post!
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </div>
            </Container>
        </>
    );
};

export default LikedPost;
