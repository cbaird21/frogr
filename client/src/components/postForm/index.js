import React, { useState } from 'react';
// Import the `useMutation()` hook from Apollo Client
import { useMutation } from '@apollo/client';
// Import the GraphQL mutation
import { ADD_POST } from '../../utils/mutations';
import Uploadwidget from '../UploadWidget';

const PostForm = () => {
    const [postImage, setImage] = useState('');
    const [postText, setText] = useState('');
    // Invoke `useMutation()` hook to return a Promise-based function and data about the ADD_POST mutation
    const [addPost, { error }] = useMutation(ADD_POST);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addPost({
                variables: { postImage, postText }
            });
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div>
            <h3>What's on your mind?</h3>
            <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
            >
                <div className="col-12 col-lg-9">
                    {/* <input
                        type="button"
                        placeholder="Add your image post here..."
                        value={postImage}
                        className="form-input w-100"
                        onChange={(event) => setImage(event.target.value)}
                    />         */}
                    <Uploadwidget/>
                        
                    
                </div>

                <div className="col-12 col-lg-9">
                    <input
                        placeholder="Add your post text here..."
                        value={postText}
                        className="form-input w-100"
                        onChange={(event) => setText(event.target.value)}
                    />
                </div>

                <div className="col-12 col-lg-3">
                    <button className="btn btn-outline-success mt-2" type="submit">
                        Add a Text Post
                    </button>
                </div>
                {error && (
                    <div className="col-12 my-3 bg-danger text-white p-3">
                        Something went wrong...
                    </div>
                )}
            </form>
        </div>
    )
};

export default PostForm;