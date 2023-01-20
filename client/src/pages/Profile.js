import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Transformation} from "@cloudinary/url-gen";
// Import required actions.
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
// Import required qualifiers.
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
//import React/bootstrap
import { Card, Container, Button} from 'react-bootstrap';
//import PostForm
import Postform from '../components/PostForm'
import {useQuery, useMutation} from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_POST } from '../utils/mutations';
import Auth from '../utils/auth';



const Profile = () => {
    
    // get logged in user data
    const { loading, data } = useQuery(GET_ME);
    const userData = data?.me || [{}];
    const [removePost] = useMutation(REMOVE_POST);
    
    const handleDeletePost = async (postId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
            return false;
            }

            try {
            const { data } = await removePost({
                variables: { postId },
            });

            removePost(postId);
            } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log(...userData)
    return (
        <> 
        { 
            Auth.loggedIn() ? (
                        <Container fluid className="row vh-100 justify-content-start ms-auto mb-2">
                            <main id="postContainer" className="col-9 border h-100 d-inline-block rounded overflow-hidden">
                                <div id="postContainer d-flex">
                                    <h2>My Posts</h2>
                                    {
                                        userData.posts.map((post) => {
                                            return(
                                                <Card className='m-3' style={{ width: '18rem' }}>
                                                <Card.Header>
                                                    <img alt="profile pic" src={post.authorPic}></img><h3>{post.postAuthor}</h3>
                                                </Card.Header>
                                                <Card.Body>
                                                    <AdvancedImage cldImg={post.postImage} />
                                                    <Card.Text>
                                                        {post.description}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <small className="text-muted">createdAt {post.createdAt}</small>
                                                    <img id="removePost" src=""><Button
                                                    className="btn-block btn-danger"
                                                    onClick={() => handleDeletePost(post.postId)}
                                                    /></img>
                                                </Card.Footer>
                                            </Card>
                                            )
                                            
                                        })
                                    }
                                </div>
                            </main>
                            <aside className="col-3">    
                                <Card bg="secondary" className="w-100 h-100  d-inline-block">
                                    <Card.Header className="p-4 m-0  border-bottom">
                                        <AdvancedImage className="p-2" cldImg={userData.profilePic} />
                                        <h2 className="p-2 d-inline">{`${userData.username}}`}</h2>
                                        <p className="p-2">{`${userData.posts.length}`} Posts </p>
                                    </Card.Header>
                                    <Card.Body>
                                        <Postform/>
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