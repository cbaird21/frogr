
// 1. Import classes
// ==================
import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {scale} from "@cloudinary/url-gen/actions/resize";
// Import any actions required for transformations.
import {fill} from "@cloudinary/url-gen/actions/resize";
import { Container, Card } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';

const Discover = () => {
    // 2. Set your cloud name
    //========================
    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            apiSecret: process.env.CLOUDINARY_API_SECRETs,
            encrypted: true,
        }
    });
    // // 3. Get your image
    // //===================
    // // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
    console.log(cld)
    const myImage = cld.image(`sample`)
    // // 4. Transform your image
    // //=========================
    // // Resize to 250 x 250 pixels using the 'fill' crop mode.
    myImage.resize(scale().width(250).height(250)).format('png');
    // 5. Deliver your image
    // =========================
    // Render the image in a React component.
    return (
        <Container fluid>
            <h1>This is the discover page</h1>
            <Card className='m-3' style={{ width: '18rem' }}>
                <CardHeader>
                    
                    <img alt="profile pic"></img><h3>Username</h3>
                </CardHeader>
                <Card.Body>
                    <AdvancedImage cldImg={myImage} />
                    <Card.Text>
                        post description
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">createdAt</small>
                </Card.Footer>
            </Card>
        </Container>
    )

};

export default Discover;
