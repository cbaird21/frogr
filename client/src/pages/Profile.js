import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";


// Import required actions.
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";


// Import required qualifiers.

import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";

//import React/bootstrap
import { Card, Container} from 'react-bootstrap';

//import PostForm
import Postform from '../components/PostForm'
import {useQuery} from '@apollo/client'
import { GET_ME } from '../utils/queries';
const myPosts = []; // array of this users posts with images from cloudinary 


const Profile = () => {
    const me = useQuery(GET_ME) // logged in user
    
  // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({
        cloud: {
        cloudName: 'demo'
        }
    }); 

    // Use the image with public ID, 'front_face'.
    const profilePic = cld.image('front_face');

    // Apply the transformation.
    profilePic
    .resize(thumbnail().width(50).height(50).gravity(focusOn(FocusOn.face())))  // Crop the image.
    .roundCorners(byRadius(100))   // Position the logo.  // Rotate the result.
    .format('png');   // Deliver as PNG. */
    
    const loggedIn = true
    // Render the transformed image in a React component.
    return (
        <> 
        { 
            loggedIn ? (
                        <Container fluid className="row vh-100 justify-content-start ms-auto mb-2">
                            <main id="postContainer" className="col-9 border h-100 d-inline-block rounded overflow-hidden">
                                <div id="postContainer d-flex">
                                    <p> this container will display all user's posts</p>
                                    {
                                        myPosts.map((post) => {
                                            return(
                                                <Card className='m-3' style={{ width: '18rem' }}>
                                                <Card.Header>
                                                    <img alt="profile pic"></img><h3>{post.postAuthor}</h3>
                                                </Card.Header>
                                                <Card.Body>
                                                    <AdvancedImage cldImg={post.postImage} />
                                                    <Card.Text>
                                                        {post.description}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <small className="text-muted">createdAt {post.createdAt}</small>
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
                                        <AdvancedImage className="p-2" cldImg={profilePic} />
                                        <h2 className="p-2 d-inline">{`${me.username}}`}</h2>
                                        <p className="p-2">{`${myPosts.length}`} Posts </p>
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