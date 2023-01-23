import React from 'react'
// import { AdvancedImage } from '@cloudinary/react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

//import React/bootstrap
import { Card, Container, Button } from 'react-bootstrap';
import Accordion from "react-bootstrap/Accordion";
import Commentform from "../components/commentForm";
//import PostForm
import Postform from '../components/postForm';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_POST } from '../utils/mutations';
import Auth from '../utils/auth';
import { removePostId } from "../utils/localStorage";

const Profile = () => {
    const { loading, error, data } = useQuery(GET_ME); // logged in user
    const [removePost] = useMutation(REMOVE_POST);
    const userData = data?.me || {};

    const handleRemovePost = async (postId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        // console.log(token)
        // console.log(userData)

        if (!token) {
            console.log("not logged in!!")
            return false;
        }

        try {
            console.log("logged in, attempting to remove post ...")
            const { data } = await removePost({
                variables: { postId },
            })
            console.log(data)
            removePostId(postId);

        } catch (err) {
            console.log(JSON.stringify(err));
        }
        window.location.reload();
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <p>Error!</p>
    }
    // console.log(error);

    // Render the transformed image in a React component.
    return (
        <>
            {Auth.loggedIn ? (
                <Container fluid className="row vh-100 justify-content-start ms-auto mb-2">
                    <main className="customScrollBar col-9 border h-100 d-inline-block rounded overflow-scroll">
                        <div id="postContainer d-flex">
                            <h2>My Posts</h2>
                            <ResponsiveMasonry
                                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                            >
                                <Masonry>
                                    {
                                        userData.posts.map((post) => {
                                            return (
                                                <Card key={post._id} className='m-3 lightergrey' style={{ width: '18rem' }}>
                                                    <Card.Header className='lightergrey'>
                                                        {post.userPic ? (<Card.Img alt="profile pic"></Card.Img>) : ""}<h3>{post.postAuthor}</h3>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Card.Img src={post.postImage}></Card.Img>
                                                        <Card.Text>
                                                            {post.postText}
                                                        </Card.Text>
                                                        {/* remove post button */}
                                                        <Button
                                                            className="btn-block btn-danger"
                                                            onClick={() => handleRemovePost(post._id)}
                                                        >
                                                            Delete this post!
                                                        </Button>
                                                        <small className="text-muted ms-auto d-block"> {post.createdAt}</small>
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
                                            )
                                        })
                                    }
                                </Masonry>
                            </ResponsiveMasonry>
                        </div>
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
            ) : (
                <div>
                    <alert color="danger">You must be logged in first!</alert>
                </div>
            )
            }


        </>


    )
};

export default Profile;