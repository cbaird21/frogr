import React, { useState, useEffect } from "react";
import {
    Jumbotron,
    Container,
    Col,
    Form,
    Button,
    Card,
    CardColumns,
} from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LIKED_POST } from "../utils/mutations";
import Auth from "../utils/auth";
// import { searchGoogleBooks } from '../utils/API';
import { savePostIds, getSavedPostIds } from "../utils/localStorage";

const SavedPosts = () => {
    // create state for holding returned cloudinary api data
    const [searchedPost, setsearchedPost] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState("");
    // create state to hold saved bookId values
    const [savedPostIds, setsavedPostIds] = useState(getSavedPostIds());

    const [savePost, { error }] = useMutation(LIKED_POST);

    // set up useEffect hook to save `savedPostIds` list to localStorage on component unmount
    // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    useEffect(() => {
        return () => savePostId(savedPostIds);
    });

    // create method to search for books and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const cloudAPI = await fetch('https://api.cloudinary.com/v1_1/drxesxzoi');
            // removes the need for the api util
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
            );

            if (!cloudAPI.ok) {
                throw new Error("something went wrong!");
            }

            const { items } = await cloudAPI.json();

            const postData = items.map((post) => ({
                postId: post.id,
                authors: post.volumeInfo.authors || ["No author to display"],
                title: post.volumeInfo.title,
                description: post.volumeInfo.description,
                image: post.volumeInfo.imageLinks?.thumbnail || "",
            }));

            setsearchedPost(postData);
            setSearchInput("");
        } catch (err) {
            console.error(err);
        }
    };

    // create function to handle saving a book to our database
    const handlesavePost = async (postId) => {
        // find the post in `searchedPost` state by the matching id
        const postToSave = searchedPost.find((post) => post.postId === postId);

        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            // savePost(postToSave, token)
            // Use the Apollo useMutation() Hook to execute the LIKED_POST mutation in the handlesavePost() function instead of the savePost() function imported from the API file.
            const { data } = await savePost({
                // newPost from savePost typeDef
                variables: { newPost: { ...postToSave } },
            });


            // Make sure you keep the logic for saving the post's ID to state in the try...catch block!
            // if post successfully saves to user's account, save post id to state
            setsavedPostIds([...savedPostIds, postToSave.postId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Jumbotron fluid className="text-light bg-dark">
                <Container>
                    <h1>Discover different ideas!</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name="searchInput"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type="text"
                                    size="lg"
                                    placeholder="Search to Discover new things!"
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button type="submit" variant="success" size="lg">
                                    Submit Search
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </Jumbotron>

            <Container>
                <h2>
                    {searchedPost.length
                        ? `Viewing ${searchedPost.length} results:`
                        : "Search for a book to begin"}
                </h2>
                <CardColumns>
                    {searchedPost.map((post) => {
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
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={savedPostIds?.some(
                                                (savedPostId) => savedPostId === post.postId
                                            )}
                                            className="btn-block btn-info"
                                            onClick={() => handlesavePost(post.postId)}
                                        >
                                            {savedPostIds?.some(
                                                (savedPostId) => savedPostId === post.postId
                                            )
                                                ? "This post has already been saved!"
                                                : "Save this post!"}
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    );
};

export default SavedPosts;
