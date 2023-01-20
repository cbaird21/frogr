import React from "react";
// import { AdvancedImage } from "@cloudinary/react";
// import { Cloudinary } from "@cloudinary/url-gen";
// import { scale } from "@cloudinary/url-gen/actions/resize";
// Import any actions required for transformations.
// import { fill } from "@cloudinary/url-gen/actions/resize";
import { Container, Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../utils/queries";



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
                <Card.Img
                  style={{ width: "18rem" }}
                  src={post.profilePic}
                  alt="profile pic"
                ></Card.Img>
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
            </Card>
          );
        })}
      </Container>
    </>
  );

};

export default Discover;
