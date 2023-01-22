import React from 'react';

const CommentList = ({ comments = [] }) => {
    if (!comments.length) {
        return <h3>No Comments Yet</h3>;
    }

    return (
        <>
<<<<<<< HEAD
            <h3
                className="p-5 display-inline-block"
                style={{ borderBottom: '1px dotted #1a1a1a' }}
            >
                Comments
            </h3>
            <div className="flex-row my-4">
                {comments &&
                    comments.map((comment) => (
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
                    ))}
            </div>
        </>
    );
};

export default CommentList;








// searching individual attempt

// import React from 'react';
// import { useQuery } from "@apollo/client";
// import { GET_POST } from "../../utils/queries";



// const CommentList = () => {
//     const { loading, data } = useQuery(GET_POST);
//     const posts = data?.posts || [];
//     // Render the image in a React component.
//     // loading

//     // // trying to use some redux on this.
//     // const { comments, addComments, removeComments } = useComments();





//     if (loading) {
//         return <div>Loading...</div>;
//     }
//     console.log();



//     // if (!posts.comments.length) {
//     //     return <h3>No Comments Yet</h3>;
//     // }

//     return (
//         <>

//             <div className="flex-row my-4">
//                 {posts.map((post) => (
//                     post.comments.map((comment) => {
//                         return (

//                             <div key={comment._id} className="col-12 mb-3 pb-3">
//                                 <div className="p-3 bg-dark text-light">
//                                     <h5 className="card-header">
//                                         {comment.commentAuthor} commented{' '}
//                                         <span style={{ fontSize: '0.825rem' }}>
//                                             on {comment.createdAt}
//                                         </span>
//                                     </h5>
//                                     <p className="card-body">{comment.commentText}</p>
//                                 </div>
//                             </div>
//                         )
//                     })
//                 ))}
//             </div>
//         </>
//     );
// };

// export default CommentList;





// redux attempt 


// export default function CommentList() {
//     // const initalState = useComments();
//     // const { comments, addComment, removeComment } = useComments();
//     const [state, dispatch] = useComments();

    
    


    
    
//     return (
//         <section className="comment-list">
//             {comments.map((comment) => (
//                 <div key={comment.id} className="card mb-3">
//                     <h4 className="card-header bg-primary text-light p-2 m-0">
//                         {comment.text} <br />
//                         <span style={{ fontSize: '1rem' }}>
//                             {comment.author}
//                         </span>
//                     </h4>
//                 </div>
//             ))}
//         </section>
//     );
// }


=======
            <div className="flex-row my-4">
                {posts.map((post) => 
                    {post.forEach((post) => {
                        post.comments.map((comment) => {
                            return(
                                <>
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
                                </>
                            )}
                        )}    
                    )}
                    )
                }
            </div>    
            </>
    )
};

export default CommentList;
>>>>>>> main
