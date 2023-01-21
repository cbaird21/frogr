import React from 'react';
import { useQuery } from "@apollo/client";
import { GET_POST } from "../../utils/queries";

const CommentList = () => {
    const { loading, data } = useQuery(GET_POST);
    const posts = data?.posts || [];
    // Render the image in a React component.
    // loading
    if (loading) {
        return <div>Loading...</div>;
    }
    console.log();

    

    // if (!posts.comments.length) {
    //     return <h3>No Comments Yet</h3>;
    // }

    return (
        <>
            
            <div className="flex-row my-4">
                {posts.map((post) => (
                    post.comments.map((comment)=> {
                        return(

                            <div key={comment._id} className="col-12 mb-3 pb-3">
                            <div className="p-3 bg-dark text-light">
                                <h5 className="card-header">
                                    {comment.commentAuthor} commented{' '}
                                    <span style={{ fontSize: '0.825rem' }}>
                                        on {comment.createdAt}
                                    </span>
                                </h5>
                                <p className="card-body">{comment.commentText}</p>
                            </div>
                        </div>
                            )
                        })
                    ))}
            </div>
        </>
    );
};

export default CommentList;
