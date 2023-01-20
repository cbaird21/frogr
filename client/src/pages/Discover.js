<<<<<<< HEAD

// 1. Import classes
// ==================
import React from 'react'
import { AdvancedImage } from '@cloudinary/react';
=======
import React from "react";
import { AdvancedImage } from "@cloudinary/react";
>>>>>>> 59b43f86f57372e894ff908105363d2e47e43cff
import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
// Import any actions required for transformations.
import { fill } from "@cloudinary/url-gen/actions/resize";
<<<<<<< HEAD
import { Container, Card } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
require('dotenv').config()

const Discover = () => {
    // 2. Set your cloud name
    //========================
    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'drxesxzoi',


        }
    });
    // 3. Get your image
    //===================
    // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
    const myImage = cld.image('images/frog1');
    // 4. Transform your image
    //=========================
    // Resize to 250 x 250 pixels using the 'fill' crop mode.
    myImage.resize(scale().width(250).height(250)).format('png');
    // 5. Deliver your image
    // =========================
    // Render the image in a React component.

    return (

        <Container fluid>
            <h1>This is the discover page</h1>
            {/* THIS WILL NEED TO MAP THROUGH ALL POSTS */}
            <Card className='m-3' style={{ width: '18rem' }}>
                <CardHeader>
                    {/* pull author of the post, profile pic and username*/}
                    {/* ensure username clicks to their profile, if not logged in, can't click */}
                    <img alt="profile pic"></img><h3>Username</h3>
                </CardHeader>
                <Card.Body>
                    {/* post image if available */}
                    <AdvancedImage cldImg={myImage} />
                    <Card.Text>
                        {/* post text if available */}
                        post description
                        {/* comments and likes need icons */}
                        {/* when comments is clicked text box  should appear */}
                        {/* when like is clicked, the toggle with shade, saves to liked post */}

                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">createdAt</small>
                </Card.Footer>
=======
import { Container, Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../utils/queries";

// import {useQuery} from '@apollo/client';
// import { GET_POST } from '../utils/queries';

const Discover = () => {
  const { loading, data } = useQuery(GET_POST);
  const posts = data?.posts || [];
  // Render the image in a React component.
  // loading
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(posts);
  return (
    <>
      <Container fluid>
        <h1>This is the discover page</h1>
        {posts.map((post) => {
          return (
            <Card className="m-3" style={{ width: "18rem" }}>
              <CardHeader>
                <img src={`"${post.profilePic}"`} alt="profile pic"></img>
                <h3>{post.postAuthor}</h3>
              </CardHeader>
              <Card.Body>
                <img src={post.postImage} alt="post image"></img>
                <Card.Text>{post.postText}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  created at: {post.createdAt}
                </small>
              </Card.Footer>
>>>>>>> 59b43f86f57372e894ff908105363d2e47e43cff
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default Discover;
