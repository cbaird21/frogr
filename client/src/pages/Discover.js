import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Accordion from 'react-bootstrap/Accordion';

import { Container, Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../utils/queries";
import Commentform from "../components/CommentForm/index"


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
      <Container fluid className="row vh-100 mb-2">
        <main className="col-9 border h-100 d-inline-block rounded overflow-scroll">
          <h1>Hop around and find out</h1>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry>
              {posts.map((post) => {
                return (
                  <Card key={post._id} className="m-3" style={{ width: "18rem" }}>
                    <CardHeader>
                      <Card.Img
                        style={{ width: "18rem" }}
                        src={post.profilePic}
                        alt="profile pic"
                      ></Card.Img>
                      <h3>{post.postAuthor}</h3>
                    </CardHeader>
                    <Card.Body>
                      <Card.Img src={post.postImage} alt="post image"></Card.Img>
                      <Card.Text>{post.postText}</Card.Text>
                      <small className="text-muted">
                        created at: {post.createdAt}
                      </small>
                    </Card.Body>
                    <Card.Footer>
                      <Accordion defaultActiveKey="null" flush>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Comment</Accordion.Header>
                          <Accordion.Body>
                            <Commentform />
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Card.Footer>
                  </Card>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </main>
        <aside className="col-3">
          <Card bg="secondary" className="w-100 h-100  d-inline-block">
            <Card.Header className="p-4 m-0  border-bottom">
              <h2>Discover different ideas!</h2>
            </Card.Header>
            <Card.Body>
              {/* search form  */}
              {/* <Form onSubmit={handleFormSubmit}>
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
              </Form> */}
            </Card.Body>
          </Card>
        </aside>
      </Container>
    </>
  );
};

export default Discover;