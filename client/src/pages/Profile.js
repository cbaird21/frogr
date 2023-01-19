import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {Transformation} from "@cloudinary/url-gen";

// Import required actions.
import {thumbnail, scale} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {sepia} from "@cloudinary/url-gen/actions/effect";
import {source} from "@cloudinary/url-gen/actions/overlay";
import {opacity,brightness} from "@cloudinary/url-gen/actions/adjust";
import {byAngle} from "@cloudinary/url-gen/actions/rotate"

// Import required qualifiers.
import {image} from "@cloudinary/url-gen/qualifiers/source";
import {Position} from "@cloudinary/url-gen/qualifiers/position";
import {compass} from "@cloudinary/url-gen/qualifiers/gravity";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";

//import React/bootstrap
import { Card, Container} from 'react-bootstrap';

const posts = []; // array of this users posts with images from cloudinary 
const me = "" // logged in user
const Profile = () => {
    
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
                <aside className="profile-container ms-auto">
                    <div>
                        <h2 className="">{`${me.username}}`}</h2>
                        <AdvancedImage cldImg={profilePic} />
                    </div>
                </aside>
            ) : (
                <div>
                    <alert>You must be logged in first!</alert>
                </div>
            )
        }
            
            <div calssName="post-container">
                <Container>
                    { 
                        posts.map((post) =>(
                            <Card>
                                <Card.Header>
                                    <img>{`${post.author.profilePic}`}</img>
                                    <h5>{`${post.author}`}</h5>
                                </Card.Header>
                                <Card.Body>
                                    <img>post image here</img>
                                    <Card.Text>
                                        this is the post meat
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </Container>
            </div>
        </>
        

    )
};

export default Profile;