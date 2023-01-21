import React from 'react'
import { AdvancedImage } from '@cloudinary/react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

//import React/bootstrap
import { Card, Container } from 'react-bootstrap';

//import PostForm
import Postform from '../components/PostForm'
import {useQuery} from '@apollo/client'
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth'

const Profile = () => {
    const { loading, error, data } = useQuery(GET_ME); // logged in user
    const userData = data?.me || {};
    console.log(userData);
    
    // Create and configure your Cloudinary instance.
    
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <p>Error!</p>
    }
    console.log(data);
    console.log(error);

    // Render the transformed image in a React component.
    return (
        <> 
        { Auth.loggedIn ? (
            <Container fluid className="row vh-100 justify-content-start ms-auto mb-2">
                <main className="col-9 border h-100 d-inline-block rounded overflow-scroll">
                    <div id="postContainer d-flex">
                        <h2>My Posts</h2>
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                        >
                        <Masonry> 
                            {
                                userData.posts.map((post) => {
                                    return(
                                        <Card key={post._id} className='m-3' style={{ width: '18rem' }}>
                                            <Card.Header>
                                                <Card.Img alt="profile pic"></Card.Img><h3>{post.postAuthor}</h3>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Img src={post.postImage}></Card.Img>
                                                    <Card.Text>
                                                        {post.postText}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <small className="text-muted">createdAt {post.createdAt}</small>
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
                                <Card bg="secondary" className="w-100 h-100  d-inline-block">
                                    <Card.Header className="p-4 m-0  border-bottom">
                                        <AdvancedImage className="p-2" cldImg={userData.userPic} />
                                        <h2 className="p-2 d-inline">{userData.username}</h2>
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